/**
 * @file protocol/protocol.mjs
 * 
 * * --------------------------------------------------------------------------
 * ZTeraDB Protocol Wire Module
 * --------------------------------------------------------------------------
 * 
 * * @description
 * Low-level binary stream framing and orchestration layer for ZTeraDB connections.
 * Intercepts byte streams, handles TLS handshakes, enforces frame isolation via 
 * length-prefixed big-endian framing boundaries, and bridges network sockets to 
 * async consumer streams.
 * 
 * * @dependencies 
 * - `tls`: Node.js native Transport Layer Security module.
 * - `net`: Node.js native Transmission Control Protocol (TCP) module.
 * - `ZTeraDBConnectionManager`: Connection pooling manager.
 * - `ZTeraDBError`, `AuthenticationError`, `QueryComplete`: Specialized exception classes.
 * - `RequestType`: Protocol constants mapping upstream request identifiers.
 * - `ResponseType`: Protocol constants mapping downstream server state transitions.
 * 
 * * @example
 * const connection = new ZTeraDBProtocol(host, port, ZTeraDBConfig, clientAuth);
 * const authData = await connection.authenticate();
 * console.log('Authenticated with token:', authData.access_token);
 * * const stream = await connection.executeQuery('SELECT * FROM users', poolManager);
 * for await (const row of stream) {
 * console.log('Row payload:', row);
 * }
 * 
 * @class       ZTeraDBProtocol
 * @package     zteradb.protocol
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence (SPDX-License-Identifier: Proprietary)
 */

// Import the 'net' module to manage TCP connections.
// The 'net' module provides an asynchronous network API for creating stream-based TCP servers and clients.
import * as tls from 'tls';
import * as net from 'net';

import ZTeraDBConnectionManager from "@zteradb/client/connection/zteradb-connection";
import { AuthenticationError, ZTeraDBError, QueryComplete } from '@zteradb/client/helper/zteradb-exception';
import RequestType from '@zteradb/client/constants/zteradb-request-types';
import ResponseType from '@zteradb/client/constants/zteradb-response-types';

/**
 * Size of the length prefix header tracking wire allocations.
 * Represents a 4-byte big-endian unsigned integer (UInt32BE).
 * @type {number}
 */
const HEADER_SIZE = 4;

/**
 * Connection state identifiers for the protocol machine state lifecycle.
 * @enum {number}
 */
const CONNECTION_STATE = {
  CONNECTING: 1,
  CONNECTED: 2,
  AUTHENTICATING: 3,
  READY: 4,
  CLOSED: 5
}

/**
 * ZTeraDBProtocol handles the TCP connection with the ZTeraDB service, sending and receiving messages.
 * 
 * This class is responsible for managing the lifecycle of a network connection to the ZTeraDB service, 
 * including opening, closing, sending data (requests), and receiving responses. It manages the raw 
 * communication and provides methods to interact with the ZTeraDB service using a socket connection.
 * 
 * It works in conjunction with the `ZTeraDBClientAuth` class to handle authentication and security,
 * and with the `ZTeraDBProtocol` class to facilitate query execution and result retrieval.
 * 
 * @class
 * @example
 * const connection = new ZTeraDBProtocol(host, port, ZTeraDBConfig);
 * connection.connect()
 *   .then(() => {
 *     console.log('Connected to ZTeraDB');
 *     connection.sendRequest(query)
 *       .then(response => console.log('Query Response:', response))
 *       .catch(error => console.error('Query failed:', error));
 *   })
 *   .catch(error => console.error('Connection failed:', error));
 */
class ZTeraDBProtocol {
  /**
   * Creates an instance of ZTeraDBConnection.
   * @param {string} host - The hostname or IP address of the ZTeraDB service.
   * @param {number} port - The port number to connect to the ZTeraDB service.
   * @param {object} ZTeraDBConfig - The ZTeraDBConfig object
   * @param {Object} clientAuth - An instance of ZTeraDBClientAuth.
   */
  constructor(host, port, ZTeraDBConfig, clientAuth) {
    this.host = host;  // The hostname or IP address of the ZTeraDB service
    this.port = port;  // The port number to connect to the ZTeraDB service
    this.ZTeraDBConfig = ZTeraDBConfig; // ZTeraDBConfig
    this.clientAuth = clientAuth;  // Client auth
    this.socket = null;  // The current socket connection, initially null
    this.isConnecting = false;  // Flag to indicate if a connection is being established
    this.defaultBuffer = Buffer.alloc(HEADER_SIZE); // Default buffer (4-byte) for reading message length
    this.buffer = [];  // Buffer to hold incoming data chunks before processing
    this.dataHandler = null;  // Placeholder for a data handler function (callback) when new data arrives
    this.connectPromise = null;

    this.recvBuffer = Buffer.alloc(0);
    // Add max buffer size limit (e.g., 1MB)
    this.maxBufferSize = 1024 * 1024; // 1MB
  }

  /**
   * Manages buffer size by checking if it exceeds the maximum limit.
   * If the buffer exceeds the limit, it retains only the newest half of the buffer.
   */
  manageBufferSize() {
    let totalSize = this.buffer.reduce((acc, chunk) => acc + chunk.length, 0);  // Calculate the total size of all data chunks in the buffer

    // If the total size exceeds the maximum buffer size, reduce the buffer size
    if (totalSize > this.maxBufferSize) {
      console.warn('Buffer size exceeded max limit, flushing buffer...');
      this.buffer = this.buffer.slice(Math.floor(this.buffer.length / 2)); // Keep only the newest half
    }
  }

  /**
   * Retrieves an existing connection if it is active, or establishes a new one.
   * This method handles the case where a connection is being established concurrently.
   * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection.
   */
  async getConnection() {
    if (this.socket && !this.socket.destroyed && this.state === CONNECTION_STATE.READY) {
      return this.socket;
    }

    if (!this.connectPromise) {
      this.connectPromise = this.connectToServer()
        .finally(() => {
          this.connectPromise = null;
        });
    }

    return this.connectPromise;
  }
  
  /**
   * Establishes a connection to the ZTeraDB service and returns the active socket connection.
   * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection once connected.
   */
  connectToServer() {
    this.state = CONNECTION_STATE.CONNECTING;

    return new Promise((resolve, reject) => {

      const useTLS = this.ZTeraDBConfig.use_tls;

      const socket = useTLS
        ? tls.connect({
            host: this.host,
            port: this.port,
            servername: this.ZTeraDBConfig.verify_tls_host ? this.host : undefined,
            rejectUnauthorized: this.ZTeraDBConfig.verify_tls_host,
            minVersion: 'TLSv1.2'
          })
        : net.connect({
            host: this.host,
            port: this.port
          });

      this.socket = socket;

      const onConnected = () => {
        socket.setNoDelay(true);
        socket.setKeepAlive(true);
        this.isConnecting = false;
        this.attachListeners(socket);
        this.state = CONNECTION_STATE.CONNECTED;
        resolve(socket);
      };

      if (useTLS) {
        socket.once('secureConnect', onConnected);
      }
      else {
          socket.once('connect', onConnected);
      }

      socket.once('error', (err) => {
        reject(this.handleConnectionError(err));
      });

    });
  }

  attachListeners(socket) {
    socket.on('data', this.handleIncomingData.bind(this));
    socket.on('end', this.handleConnectionEnd.bind(this));
    socket.once('error', (err) => this.handleConnectionError(err));
    socket.once("timeout", () => socket.destroy());
  }

  /**
   * Processes incoming data by adding it to the internal buffer.
   * If a data handler is defined, it will be triggered to process the data.
   * @param {Buffer} data - The data received from the server.
   */
  handleIncomingData(data) {
    // Append incoming data to recv buffer
    if (this.recvBuffer.length === 0) {
      this.recvBuffer = data;
    } else {
      // const newBuffer = Buffer.allocUnsafe(this.recvBuffer.length + data.length);
      // this.recvBuffer.copy(newBuffer, 0);
      // data.copy(newBuffer, this.recvBuffer.length);
      // this.recvBuffer = newBuffer;
      this.recvBuffer = Buffer.concat([this.recvBuffer, data]);
    }

    while (this.recvBuffer.length >= HEADER_SIZE) {

      const messageSize = this.recvBuffer.readUInt32BE(0);
      const totalSize = HEADER_SIZE + messageSize;

      // Wait until full message arrives
      if (this.recvBuffer.length < totalSize) {
        break;
      }

      // Extract full message
      const message = this.recvBuffer.slice(HEADER_SIZE, totalSize);

      // Remove processed message from buffer
      this.recvBuffer = this.recvBuffer.slice(totalSize);

      // Push message to processing queue
      this.buffer.push(message);
    }

    // Notify awaiting reader
    if (this.dataHandler) {
      this.dataHandler();
    }
  }

  /**
   * Resets the connection when the connection ends.
   * This should be called when the server closes the connection.
   */
  handleConnectionEnd() {
    if (this.socket) {
      this.socket.destroy();  // Destroy the connection if there is an error
      this.socket = null;     // Reset the connection to null when the connection ends
    }
  }

  /**
   * Handles errors during the connection process.
   * @param {Error} err - The error encountered during connection.
   * @throws {ZTeraDBError} Custom error class with a specific message.
   */
  handleConnectionError(err) {
    this.isConnecting = false;
    
    if (this.socket) {
      this.socket.destroy();  // Destroy the connection if there is an error
      this.socket = null;     // Reset the connection to null when the connection erro occurs
    }
    
    return new ZTeraDBError("Connection error", ResponseType.CONNECT_ERROR, err.message);
  }

  /**
   * Sends data over the connection. The data is serialized into JSON and sent as a buffer.
   * @param {net.Socket} connection - The socket connection to send the data through.
   * @param {Object} data - The data to be sent (typically a query or a message).
   * @returns {Promise<boolean>} A promise that resolves to true if the data is successfully sent.
   */
  async send(connection, data) {
    const messageBuffer = this.createMessageBuffer(data);  // Create the buffer containing the data

    // connection.setNoDelay(true);  // Disable Nagle's algorithm for low-latency communication
    return new Promise((resolve, reject) => {
      const canWrite = connection.write(messageBuffer, (err) => {
        if (err) {
          reject(new ZTeraDBError('Query error', ResponseType.QUERY_ERROR, err.message));
        }
      });

      if (!canWrite) {
        connection.once('drain', resolve);
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Creates a message buffer by encoding the data into a JSON string,
   * calculating its length, and prepending the length to the data.
   * @param {Object} data - The data to be sent (typically a JSON object).
   * @returns {Buffer} The complete buffer containing the message length and the data.
   */
  createMessageBuffer(data) {
    const jsonString = JSON.stringify(data);  // Convert the data into a JSON string
    const messageBuffer = Buffer.from(jsonString, 'utf-8');  // Convert the JSON string into a buffer
    const lengthBuffer = Buffer.alloc(HEADER_SIZE);  // Allocate a 4-byte buffer for the message length
    lengthBuffer.writeUInt32BE(messageBuffer.length);  // Write the length of the message in the first 4 bytes

    return Buffer.concat([lengthBuffer, messageBuffer]);  // Concatenate the length and message buffers
  }

  /**
   * Executes a query on the connection by sending the query to the ZTeraDB service.
   * The query is sent as a JSON object containing the authentication details and the query string.
   * @param {string} query - The SQL query string to be executed on the server.
   * @returns {Promise<void>} A promise that resolves once the query is sent to the server.
   */
  async executeQuery(query, connectionManager) {
    if (this.state !== CONNECTION_STATE.READY) {
      throw new ZTeraDBError(
        "Connection not ready",
        ResponseType.CONNECT_ERROR,
        "Authentication not completed"
      );
    }

    const connection = await this.getConnection();  // Get the current connection
    const request_type = RequestType.QUERY;  // The type of request being sent (a query)
    const queryJSON = {
      client_key: connection.auth.client_key,  // Include client key from the connection's auth data
      access_token: connection.auth.access_token,  // Include access token from auth data
      request_type,  // Set the request type as 'QUERY'
      database_id: this.clientAuth.databaseID, // Set the database ID
      env: this.clientAuth.env, // Set the query environment
      query,  // Set the actual ZTeraDB query to be executed
    };

    // Send the query request over the connection
    await this.send(this.socket, queryJSON); // Send the query as a message over

    // Return query response
    return this.getData(connectionManager);
  }

  /**
   * Asynchronously yields incoming data from the connected ZTeraDB service.
   * This method is an asynchronous generator that listens for incoming data chunks, 
   * processes them, and yields parsed responses.
   *
   * It handles leftover data from previous chunks, ensures the buffer size is maintained, 
   * and parses the response data into JSON. The method continues until all data is processed or an error occurs.
   * 
   * This method is designed to be used in a `for-await-of` loop, allowing continuous data processing.
   *
   * @returns {AsyncGenerator<Object|null, void, unknown>} - An asynchronous iterator that yields parsed data 
   * from the server. Each yielded value corresponds to a processed response (typically a JSON object).
   * A `null` value is yielded for completed queries or other special responses.
   */
  async *getData(connectionManager=null) {
    let leftoverData = Buffer.alloc(0);  // Temporary storage for leftover response data

    try{
      // Infinite loop to continuously process incoming data
      while (true) {
        // If there is leftover data from the previous iteration, push it to the buffer
        if (leftoverData.length > 0) {
          this.buffer.unshift(leftoverData);  // Prepend leftover data to the buffer
          leftoverData = Buffer.alloc(0);  // Reset the leftover data
        }

        // If the buffer is empty, wait for data to be added
        if (this.buffer.length === 0) {
          await new Promise((resolve) => {
            // Set a handler to be called when data becomes available in the buffer
            this.dataHandler = () => {
              this.dataHandler = null;
              resolve();  // Resolve the promise when new data is added to the buffer
            };
          });
        }

        this.manageBufferSize();  // Manage the size of the buffer to prevent excessive memory usage
        const responseData = this.buffer.shift();

        let parsedResponse = null;
        try {
          parsedResponse = JSON.parse(responseData);  // Attempt to parse the response data into a JSON object
        }
        catch (error) {
          // console.error('Error parsing JSON response:', error); // If an error occurs while parsing the response, log the error and continue
          throw new ZTeraDBError("ParseJSON", -1, error);  // Yield `null` to continue gracefully if the response cannot be parsed
        }

        try {
          // Return query response
          yield this.handleResponse(parsedResponse); // Yield the parsed response, potentially processing the data further
        }
        catch(error) {
          // If error is QueryComplete then break the while loop
          if(error instanceof QueryComplete) {
            break;
          }

          // Raise error is any
          throw error;
        }
      }
    }
    finally {
      if(connectionManager instanceof ZTeraDBConnectionManager) {
        connectionManager.releaseConnection(this);
      }
    }
  }

  /**
   * Extracts and returns the appropriate response data based on the parsed response.
   * The method checks for error conditions, handles different response codes, and returns
   * the relevant data or error message.
   *
   * @param {Object} parsedResponse - The parsed response from the server.
   * @returns {Object|null} - The data extracted from the response, or `null` for completed queries or unrecognized response codes.
   */
  handleResponse(parsedResponse) {
    // Check if parsedResponse is valid
    if (!parsedResponse || typeof parsedResponse !== 'object') {
      // console.error('Invalid response received:', parsedResponse);
      return null;
    }
    
    // Handle error response
    if (parsedResponse.error) {
      throw new ZTeraDBError("QueryError", parsedResponse.response_code, parsedResponse.data);
    }

    // Handle specific response codes
    switch (parsedResponse.response_code) {
      case ResponseType.QUERY_COMPLETE:
        throw new QueryComplete("QueryComplete", 1, "Query has been completed.");  // Return null when query is complete

      case ResponseType.CONNECTED:
        return parsedResponse.data;  // Return connection data or query data

      case ResponseType.CONNECT_ERROR:
        throw new AuthenticationError("ConnectError", parsedResponse.response_code, parsedResponse.data);

      case ResponseType.QUERY_DATA:
        return parsedResponse.data;  // Return connection data or query data

      case ResponseType.QUERY_ERROR:
        throw new ZTeraDBError("QueryError", parsedResponse.response_code, parsedResponse.data); // Return null for unknown responses
        // return null;  // Return null for unknown responses

      default:
        // console.error('Unknown or unsupported response code:', parsedResponse.response_code);
        return null;  // Return null for unknown responses
    }
  }

  /**
   * Authenticates the connection using provided client keys.
   * Sends an authentication request and waits for the server's response.
   * If successful, stores the authentication data in the connection object.
   * 
   * @returns {Object} The authentication response data from the server.
   * @throws {Error} If there is no response or if authentication fails.
   */
  async authenticate() {
    let isResponseRecieved = false; // A flag used in case of any network error occurs.

    try {
      this.state = CONNECTION_STATE.AUTHENTICATING;

      // Step 1: Generate the authentication request data using clientAuth object.
      const clientAuthData = this.clientAuth.generateAuthRequest();

      // Step 2: Get the current connection (or establish one if needed).
      const connection = await this.getConnection();  // Get the current connection

      // Step 3: Send the authentication request to the server.
      await this.send(this.socket, clientAuthData);

      // Step 4: Await and process the incoming data stream to complete the authentication.
      for await (const responseData of this.getData()) {
        // If no response data, continue to the next iteration (wait for data)
        if (!responseData) {
          break;
        }

        // Step 5: Handle error response (authentication failure).
        if(responseData.error) {
          throw new AuthenticationError("An error occurred while authenticating credentials.", responseData.response_code, responseData.data);
        }

        // Step 6: If authentication is successful, store the response data in the connection object.
        connection.auth = responseData;  // Store the authentication response in the connection
        this.state = CONNECTION_STATE.READY;
      }

      isResponseRecieved = true;  // Set response received from ZTeraDB server
      return connection.auth;  // Return the successful authentication response data
    }
    catch(error) {
      isResponseRecieved = true;  // Set response received from ZTeraDB server

      // Log and rethrow the error for the caller to handle.
      // console.error("Authentication failed:", error);
      throw error;  // Re-throw to propagate the error.
    }
    finally {
      if(!isResponseRecieved) {
        throw new ZTeraDBError("Connection error", ResponseType.CONNECT_ERROR, "No response received from the ZTeraDB server")
      }
    }
  }

  /**
   * Closes the current connection gracefully.
   * If the connection exists, it attempts to close it and then nullifies the connection.
   * The method also handles potential errors during the close process.
   *
   * @returns {Promise<void>} A promise that resolves once the connection is closed, or rejects with an error if the close fails.
   */
  async close() {
    if (!this.socket) {
      // console.warn('Connection is already closed or does not exist.');
      return;  // If there's no connection, we exit early.
    }

    const socket = this.socket;
    this.socket = null;


    return new Promise((resolve) => {

      socket.end();

      const timer = setTimeout(() => {
        socket.destroy();
        resolve();
      }, 5000);

      socket.once('close', () => {
        clearTimeout(timer);
        resolve();
      });

    });
  }
}

export default ZTeraDBProtocol;