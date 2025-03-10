/**
 * @file zteradb-connection.js
 * 
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 * 
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 * 
 * @description: ZTeraDB Client Connection and Authentication Module
 * 
 * This module provides the functionality for interacting with a ZTeraDB instance. It includes the following features:
 * 
 * 1. **Client Authentication**: Handles authentication between the client and the ZTeraDB server using secure tokens.
 * 2. **Connection Management**: Manages individual and pooled connections to the ZTeraDB server, including connection retries, timeout handling, and error management.
 * 3. **Request Handling**: Allows for sending and receiving data (queries, results) to/from the ZTeraDB server using a TCP socket.
 * 4. **Buffering**: Implements a buffer management system to handle incoming data efficiently, including checking for buffer size limits and flushing when necessary.
 * 5. **Query Execution**: Provides a method to execute database queries and handle responses from the server.
 * 6. **Error Handling**: Robust error management through custom exceptions, including authentication errors and general ZTeraDB connection errors.
 * 7. **Connection Pooling**: Supports connection pooling to manage multiple connections efficiently, ensuring that there are always the required number of connections available for requests while not overloading the server.
 * 
 * ### Class Overview:
 * 
 * - **ZTeraDBClientAuth**: This class is responsible for generating authentication requests, including creating unique `nonce` values and generating request tokens using SHA256 encryption. It also manages the creation of the authentication payload required to connect to the server.
 * 
 * - **ZTeraDBConnection**: Handles an individual connection to the ZTeraDB server. It manages socket connections, buffers incoming data, sends messages, and processes server responses. It includes methods for data transmission, error handling, and managing connection states (open, closed, error).
 * 
 * - **ZTeraDBConnectionManager**: This class is responsible for maintaining a pool of connections to the ZTeraDB server. It handles acquiring available connections, creating new ones when necessary, and releasing connections back into the pool when they are no longer in use. It ensures that the minimum and maximum connection pool sizes are respected.
 * 
 * - **ZTeraDBConnect**: The main class responsible for interfacing with the ZTeraDB service. It utilizes `ZTeraDBConnectionManager` to obtain connections, execute queries, and yield query results asynchronously. This class encapsulates the logic for executing SQL queries and handling responses.
 * 
 * ### Usage Example:
 * ```javascript
 * import {ZTeraDBConnect} from 'zteradb';
 * 
 * const zTeraDB = new ZTeraDBConnect('localhost', 7777,
 *   {
 *   clientKey: 'your-client-key',
 *   accessKey: 'your-access-key',
 *   secretKey: 'your-secret-key'
 * });
 * 
 * 
 * // Close the connection when done
 * await zTeraDB.close();
 * ```
 * 
 * ### Key Functionalities:
 * - **Connection Management**: Manages both the authentication process and subsequent connection pooling to the ZTeraDB server.
 * - **Authentication**: Uses `clientKey`, `accessKey`, and `secretKey` to authenticate against the server, ensuring secure communication.
 * - **Query Execution**: Supports asynchronous query execution with the ability to stream large results from the server.
 * - **Error Handling**: Custom exceptions are thrown for specific error types, such as connection errors and authentication failures.
 * - **Data Buffering**: Handles incoming data streams efficiently with buffer size management and data parsing.
 * 
 * ### Dependencies:
 * - `net`: For managing the TCP connection to the ZTeraDB server.
 * - `../constants/request-types.js`: Defines the types of requests that can be sent to the ZTeraDB server (e.g., connection requests, query requests).
 * - `../constants/response-types.js`: Contains the possible response types returned by the server (e.g., success, error, query result).
 * - `../helper/exception.js`: Includes custom error classes such as `AuthenticationError` and `ZTeraDBError` for managing errors.
 * - `../helper/common.js`: Includes utility functions like `sha256` for generating cryptographic hashes.
 * - `./query.js`: Uses ZTeraDBQuery class to check query type
 * 
 * @module ZTeraDBConnect
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */


// Import the 'net' module to manage TCP connections.
// The 'net' module provides an asynchronous network API for creating stream-based TCP servers and clients.
import * as net from 'net';

import RequestType from '../constants/zteradb-request-types.mjs';
import ResponseType from '../constants/zteradb-response-types.mjs';
import { AuthenticationError, ZTeraDBError, NoResponseDataError, QueryComplete } from '../helper/zteradb-exception.mjs';
import { sha256 } from '../helper/zteradb-common.mjs';
import ZTeraDBQuery from './zteradb-query.mjs';


/**
 * Class responsible for generating and managing authentication requests for the ZTeraDB service.
 * 
 * This class is designed to handle the creation of authentication tokens and nonces, which are required
 * for establishing a secure connection to the ZTeraDB service. The `ZTeraDBClientAuth` class ensures that
 * authentication requests are made correctly by generating the necessary data, such as the `request_token`,
 * and attaching relevant keys (client key, access key, and secret key) to the request.
 * 
 * The authentication process involves generating a nonce, which is a unique value used to prevent replay attacks,
 * and a `request_token` that is derived from the nonce and secret key. This information is used to authenticate
 * the client with the ZTeraDB service.
 * 
 * @class ZTeraDBClientAuth
 */
class ZTeraDBClientAuth {
  /**
   * Creates an instance of ZTeraDBClientAuth with the provided authentication details.
   * 
   * The instance will be responsible for generating a nonce, creating a request token,
   * and generating the authentication request required to connect to the ZTeraDB service.
   * 
   * @param {Object} config - Configuration object for setting up the authentication details.
   * @param {string} config.clientKey - The unique client identifier for the ZTeraDB service.
   * @param {string} config.accessKey - The access key used for authentication with the ZTeraDB service.
   * @param {string} config.secretKey - The secret key used to generate the request token.
   * @param {string} config.databaseID - The database name used to execute the the schema query.
   * @param {string} config.nonce - The nonce value used to ensure request uniqueness (optional).
   * @param {string} config.requestToken - The request token generated by hashing the nonce and secret key (optional).
   */
  constructor({ clientKey, accessKey, secretKey, databaseID, nonce, requestToken }) {
    this.clientKey = clientKey;       // Client key for authenticating with ZTeraDB
    this.accessKey = accessKey;       // Access key for authentication
    this.secretKey = secretKey;       // Secret key for generating the request token
    this.databaseID = databaseID; // Database name used to execute the the schema query.
    this.nonce = nonce;               // Unique value to prevent replay attacks (optional)
    this.requestToken = requestToken; // Request token generated from secret key and nonce (optional)
  }

  /**
   * Generates a unique nonce, which is a random value used to prevent replay attacks.
   * 
   * The nonce is created by generating a random number within a specified range,
   * then hashing it using the SHA-256 algorithm to ensure its uniqueness and security.
   * This nonce is then stored in the `nonce` property of the instance.
   * 
   * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: 'xyz', accessKey: 'abc', secretKey: 'secret' });
   * auth.generateNonce();
   * console.log(auth.nonce); // Outputs a SHA-256 hash of the random number
   */
  generateNonce() {
    const randomNumber = Math.random() * (1000000 - 10000) + 10000; // Generate random number between 10,000 and 1,000,000
    this.nonce = sha256(randomNumber); // Hash the number with SHA-256 to create a unique nonce
  }

  /**
   * Generates the request token by hashing the secret key concatenated with the nonce.
   * 
   * The `request_token` is a crucial piece of the authentication process, as it
   * ensures that the authentication request is valid and unique. It is derived
   * by combining the `secretKey` and the `nonce`, and then hashing the resulting string
   * using the SHA-256 algorithm.
   * 
   * @returns {string} The generated request token.
   * 
   * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: 'xyz', accessKey: 'abc', secretKey: 'secret' });
   * auth.generateNonce(); // Generate nonce first
   * const token = auth.generateRequestToken();
   * console.log(token); // Outputs the generated request token
   */
  generateRequestToken() {
    const token = sha256(`${this.secretKey}${this.nonce}`); // Hash the secret key and nonce to generate the token
    return token;
  }

  /**
   * Generates the full authentication request data, including client key, access key,
   * nonce, request token, and the request type for connecting to the ZTeraDB service.
   * 
   * This method generates a full set of authentication data, including the `nonce` and
   * `request_token`, and prepares it to be sent as part of an authentication request.
   * 
   * @returns {Object} The authentication request data, including client key, access key,
   *                   nonce, request token, and request type.
   * 
   * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: 'xyz', accessKey: 'abc', secretKey: 'secret' });
   * const authRequest = auth.generateAuthRequest();
   * console.log(authRequest);
   * // Outputs:
   * // {
   * //   client_key: 'xyz',
   * //   access_key: 'abc',
   * //   nonce: 'randomNonceValue',
   * //   request_token: 'generatedRequestToken',
   * //   request_type: 1 // Typically the 'CONNECT' request type
   * // }
   */
  generateAuthRequest() {
    this.generateNonce(); // Generate a unique nonce for the authentication request
    return {
      client_key: this.clientKey,       // Include client key in the request
      access_key: this.accessKey,       // Include access key in the request
      nonce: this.nonce,                // Include the generated nonce
      database_id: this.databaseID, // Include the database name
      request_token: this.generateRequestToken(), // Include the generated request token
      request_type: RequestType.CONNECT, // Specify the request type (CONNECT request)
    };
  }
}


/**
 * ZTeraDBConnect handles the TCP connection with the ZTeraDB service, sending and receiving messages.
 * 
 * This class is responsible for managing the lifecycle of a network connection to the ZTeraDB service, 
 * including opening, closing, sending data (requests), and receiving responses. It manages the raw 
 * communication and provides methods to interact with the ZTeraDB service using a socket connection.
 * 
 * It works in conjunction with the `ZTeraDBClientAuth` class to handle authentication and security,
 * and with the `ZTeraDBConnect` class to facilitate query execution and result retrieval.
 * 
 * @class
 * @example
 * const connection = new ZTeraDBConnect(host, port, ZTeraDBConfig);
 * connection.connect()
 *   .then(() => {
 *     console.log('Connected to ZTeraDB');
 *     connection.sendRequest(query)
 *       .then(response => console.log('Query Response:', response))
 *       .catch(error => console.error('Query failed:', error));
 *   })
 *   .catch(error => console.error('Connection failed:', error));
 */
class ZTeraDBConnect {
  /**
   * Creates an instance of ZTeraDBConnection.
   * @param {string} host - The hostname or IP address of the ZTeraDB service.
   * @param {number} port - The port number to connect to the ZTeraDB service.
   * @param {Object} clientAuth - An instance of ZTeraDBClientAuth.
   */
  constructor(host, port, clientAuth) {
    this.host = host;  // The hostname or IP address of the ZTeraDB service
    this.port = port;  // The port number to connect to the ZTeraDB service
    this.clientAuth = clientAuth;  // Client auth
    this.connection = null;  // The current socket connection, initially null
    this.isConnecting = false;  // Flag to indicate if a connection is being established
    this.defaultBuffer = Buffer.alloc(2); // Default buffer (2-byte) for reading message length
    this.buffer = [];  // Buffer to hold incoming data chunks before processing
    this.dataHandler = null;  // Placeholder for a data handler function (callback) when new data arrives
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
   * Waits for the connection to be established if a connection is already in progress.
   * This is useful for avoiding multiple concurrent connection attempts.
   * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection.
   */
  async waitForConnection() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (this.connection?.writable) {
          clearInterval(interval);  // Clear the interval once the connection is writable
          resolve(this.connection);  // Resolve the promise once the connection is writable
        }
      }, 100);  // Check every 100 milliseconds
    });
  }

  /**
   * Retrieves an existing connection if it is active, or establishes a new one.
   * This method handles the case where a connection is being established concurrently.
   * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection.
   */
  async getConnection() {
    if (this.connection?.writable) {
      return this.connection; // Return the current connection if it is already writable
    }

    if (this.isConnecting) {
      return this.waitForConnection();  // If a connection is in progress, wait for it
    }

    // Begin creating a new connection
    this.isConnecting = true;
    this.connection = new net.Socket();  // Create a new TCP socket connection
    this.connection._readableState.highWaterMark = 2; // Set the buffer size for reading data

    return this.connectToServer();  // Attempt to connect to the server
  }
  
  /**
   * Establishes a connection to the ZTeraDB service and returns the active socket connection.
   * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection once connected.
   */
  connectToServer() {
    return new Promise((resolve, reject) => {
      // Attempt to connect to the ZTeraDB service
      this.connection.connect(this.port, this.host, () => {
        resolve(this.connection);  // Resolve the promise once the connection is established
      });

      // Handle incoming data on the connection
      this.connection.on('data', this.handleIncomingData.bind(this));

      // Handle the end of the connection
      this.connection.on('end', this.handleConnectionEnd.bind(this));

      // Handle connection errors
      this.connection.on('error', (err) => reject(this.handleConnectionError(err)));
    });
  }

  /**
   * Processes incoming data by adding it to the internal buffer.
   * If a data handler is defined, it will be triggered to process the data.
   * @param {Buffer} data - The data received from the server.
   */
  handleIncomingData(data) {
    this.buffer.push(data);  // Add the incoming data chunk to the buffer
    if (this.dataHandler) {
      this.dataHandler();  // Call the data handler to process the data
    }
  }

  /**
   * Resets the connection when the connection ends.
   * This should be called when the server closes the connection.
   */
  handleConnectionEnd() {
    this.connection = null;  // Reset the connection to null when the connection ends
  }

  /**
   * Handles errors during the connection process.
   * @param {Error} err - The error encountered during connection.
   * @throws {ZTeraDBError} Custom error class with a specific message.
   */
  handleConnectionError(err) {
    if (this.connection) {
      this.connection.destroy();  // Destroy the connection if there is an error
    }
    throw new ZTeraDBError("Connection error", ResponseType.CONNECT_ERROR, err.message);
  }

  /**
   * Sends data over the connection. The data is serialized into JSON and sent as a buffer.
   * @param {net.Socket} connection - The socket connection to send the data through.
   * @param {Object} data - The data to be sent (typically a query or a message).
   * @returns {Promise<boolean>} A promise that resolves to true if the data is successfully sent.
   */
  async send(connection, data) {
    const messageBuffer = this.createMessageBuffer(data);  // Create the buffer containing the data

    connection.setNoDelay(true);  // Disable Nagle's algorithm for low-latency communication
    return new Promise((resolve, reject) => {
      connection.write(messageBuffer, (err) => {
        if (err) {
          reject(new ZTeraDBError('Query error', ResponseType.QUERY_ERROR, err));  // Reject if there's a write error
        } else {
          resolve(true);  // Resolve if the data was successfully written to the connection
        }
      });
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
    const lengthBuffer = Buffer.alloc(2);  // Allocate a 2-byte buffer for the message length
    lengthBuffer.writeUInt16BE(messageBuffer.length);  // Write the length of the message in the first 2 bytes

    return Buffer.concat([lengthBuffer, messageBuffer]);  // Concatenate the length and message buffers
  }

  /**
   * Executes a query on the connection by sending the query to the ZTeraDB service.
   * The query is sent as a JSON object containing the authentication details and the query string.
   * @param {string} query - The SQL query string to be executed on the server.
   * @returns {Promise<void>} A promise that resolves once the query is sent to the server.
   */
  async executeQuery(query, connectionManager) {
    const connection = this.connection;  // Get the current connection
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
    await this.send(connection, queryJSON); // Send the query as a message over

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
  async *getData(connectionManager) {
    let leftoverData = Buffer.alloc(0);  // Temporary storage for leftover response data

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
            resolve();  // Resolve the promise when new data is added to the buffer
          };
        });
      }

      this.manageBufferSize();  // Manage the size of the buffer to prevent excessive memory usage

      const data = this.buffer.shift();  // Retrieve the first chunk of data from the buffer for processing
      const messageSize = data.slice(0, this.defaultBuffer.length).readUInt16BE(0);  // Extract the message size from the first 2 bytes of the data (message length)
      const totalDataLength = this.defaultBuffer.length + messageSize;  // Calculate the total length of the response (message size + header)
      const responseData = data.slice(this.defaultBuffer.length, totalDataLength);  // Extract the actual response data (excluding the length header)

      // If there's leftover data after extracting the message, save it for the next iteration
      if (totalDataLength < data.length) {
        leftoverData = data.slice(totalDataLength);
      }

      let parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseData);  // Attempt to parse the response data into a JSON object
      }
      catch (error) {
        console.error('Error parsing JSON response:', error); // If an error occurs while parsing the response, log the error and continue
        throw new ZTeraDBError("ParseJSON", -1, error);  // Yield `null` to continue gracefully if the response cannot be parsed
      }

      try {
        // Return query response
        yield this.handleResponse(parsedResponse, connectionManager); // Yield the parsed response, potentially processing the data further
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

  /**
   * Extracts and returns the appropriate response data based on the parsed response.
   * The method checks for error conditions, handles different response codes, and returns
   * the relevant data or error message.
   *
   * @param {Object} parsedResponse - The parsed response from the server.
   * @returns {Object|null} - The data extracted from the response, or `null` for completed queries or unrecognized response codes.
   */
  handleResponse(parsedResponse, connectionManager=false) {
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
        console.error('Unknown or unsupported response code:', parsedResponse.response_code);
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
      // Step 1: Generate the authentication request data using clientAuth object.
      const clientAuthData = this.clientAuth.generateAuthRequest();

      // Step 2: Get the current connection (or establish one if needed).
      const connection = await this.getConnection();  // Get the current connection

      // Step 3: Send the authentication request to the server.
      await this.send(connection, clientAuthData);

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
      }

      isResponseRecieved = true;  // Set response received from ZTeraDB server
      return connection.auth;  // Return the successful authentication response data
    }
    catch(error) {
      isResponseRecieved = true;  // Set response received from ZTeraDB server

      // Log and rethrow the error for the caller to handle.
      console.error("Authentication failed:", error);
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
    if (!this.connection) {
      console.warn('Connection is already closed or does not exist.');
      return;  // If there's no connection, we exit early.
    }

    try {
      // Attempt to close the connection gracefully
      await new Promise((resolve, reject) => {
        this.connection.end((err) => {
          if (err) {
            reject(new ZTeraDBError("Connection error", -1, `Failed to close connection: ${err.message}`));

          } else {
            this.connection = null;  // Reset the connection once closed
            console.log('Connection closed successfully.');
            resolve();  // Resolve when the connection is successfully closed
          }
        });
      });
    } catch (error) {
      // Log and propagate the error if closing the connection fails
      console.error('Error closing connection:', error);
      throw error;  // Re-throw to allow the caller to handle it
    }

    // if (this.connection) {
    //   this.connection.end(() => {
    //     this.connection = null;  // Reset the connection once it is closed
    //   });
    // }
  }
}


/**
 * ZTeraDBConnectionManager is a class that manages database connections for a Teradata database system.
 * It uses a connection pool to reuse existing connections or create new ones when necessary.
 * The class provides methods to acquire a connection, release it back to the pool, and close all connections.
 */
class ZTeraDBConnectionManager {
  /**
   * Creates an instance of ZTeraDBConnectionManager to manage database connections.
   * 
   * @param {string} config.host - The hostname or IP address of the database server.
   * @param {number} config.port - The port number for connecting to the database server.
   * @param {Object} ZTeraDBConfig - Configuration object for setting up the connection manager.
   * @param {string} ZTeraDBConfig.clientKey - The client key for authentication.
   * @param {string} ZTeraDBConfig.accessKey - The access key for authentication.
   * @param {string} ZTeraDBConfig.secretKey - The secret key for authentication.
   * @param {string} ZTeraDBConfig.databaseID - The database name used to execute the the schema query.
   */
  constructor(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig) {
    this.host = ZTeraDBHost;              // Database server hostname
    this.port = ZTeraDBPort;              // Database server port
    this.availableConnections = [];       // Pool of available connections
    this.runningConnections = [];         // List of active, in-use connections
    this.clientAuth = new ZTeraDBClientAuth(ZTeraDBConfig);
    // console.debug('ZTeraDBConnectionManager initialized');
    this.initializingDatabase = false;
    this.hasMinConccectionPoolOption = ZTeraDBConfig.options && ZTeraDBConfig.options.connectionPool && ZTeraDBConfig.options.connectionPool.min > 0;
    this.hasMaxConccectionPoolOption = ZTeraDBConfig.options && ZTeraDBConfig.options.connectionPool && ZTeraDBConfig.options.connectionPool.max > 0;

    this.minConnections = 0;
    if(this.hasMinConccectionPoolOption) {
      this.minConnections = ZTeraDBConfig.options.connectionPool.min;
    }

    this.maxConnections = 0;
    if(this.hasMaxConccectionPoolOption) {
      this.maxConnections = ZTeraDBConfig.options.connectionPool.max;
    }
    else {
      console.debug("Connection pooling is not used.")
    }
    
    if (this.minConnections > 0) {
      this.initializingDatabase = true;
      this.makeMinConnections()
      .then(() => {
        return;
      })
    }
  }

  async createNewConnection() {
    const connection = new ZTeraDBConnect(this.host, this.port, this.clientAuth);

    const serverAuth = await connection.authenticate();
    if (serverAuth && serverAuth.access_token) {
      return connection;
    }
  }

  /**
   * Retrieves a database connection from the pool. If no connection is available, a new one is created.
   * 
   * @returns {Promise<ZTeraDBConnection>} - A promise that resolves to a database connection object.
   */
  async getConnection() {
    let connection = this.availableConnections.pop();

    try {
      if (!connection) {
        const total_connections = this.availableConnections.length + this.runningConnections.length;

        // Wait for the connection
        if (this.maxConnections > 0 && total_connections >= this.maxConnections) {
          return new Promise((resolve) => {
            setTimeout(async() => {
                resolve(await this.getConnection());
            }, 1000);
          });
        }

        // Get the new connection
        connection = await this.createNewConnection();
      }
    } catch (error) {
      // Log the error and re-raise the exception
      console.error('Error getting or creating connection:', error);
      throw new ZTeraDBError('Unable to acquire a database connection', ResponseType.CONNECT_ERROR, error);
    }
    finally {
      if(connection) {
        this.runningConnections.push(connection); // Add the connection to the runnning connection list
        return connection; // Return the connection
      }
    }
  }

  /**
   * Creates the minimum number of connections asynchronously and adds them 
   * to the `availableConnections` array.
   * 
   * This method ensures that at least `minConnections` are established by
   * calling `createNewConnection` for each one. The connections are then stored
   * in `availableConnections` for further use.
   * 
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when all connections have been created and added.
   */
  async makeMinConnections() {
    // Loop to create the required number of connections (minConnections times)
    for(let i=0; i<this.minConnections; i++) {
      // Await the creation of a new connection and assign it to 'connection'
      const connection = await this.createNewConnection();

      // Push the newly created connection into the availableConnections array
      this.availableConnections.push(connection);
    }
  }

  /**
   * Releases a database connection back to the pool, making it available for reuse.
   * 
   * @param {Connection} connection - The connection object to be released back to the pool.
   */
  async releaseConnection(connection) {
    if (this.runningConnections.includes(connection)) {
      // Move connection from runningConnections to availableConnections
      this.runningConnections = this.runningConnections.filter(
        (conn) => conn !== connection
      );
      if(this.maxConnections && this.maxConnections < this.availableConnections.length) {
        // Log and close the unnecessory connection
        console.debug("Closing additional connection.");
        await connection.close();
      }
      else {
        this.availableConnections.push(connection); // Add connection back to available connection list
      }

    }
  }

  /**
   * Closes all database connections, both active and idle, in the pool.
   * 
   * @returns {Promise<void>} - A promise that resolves when all connections are closed.
   */
  async close() {
    try {
      // Close all available connections first
      for (const conn of this.availableConnections) {
        if (conn) await conn.close(); // Close the available connections
      }
  
      // Close all running connections
      for (const conn of this.runningConnections) {
        if (conn) await conn.close(); // Close the available connections
      }
    } catch (error) {
      // Log the error and throw a new ZTeraDBError
      console.error('Error closing connections:', error);
      throw new ZTeraDBError("Connection error", -1, "Unable to close all database connections");
    }

    // Return true
    return true;
  }
}


/**
 * ZTeraDBConnection is a class that provides a higher-level interface for connecting to a ZTeraDB database,
 * executing queries, and handling results. It ensures proper connection management and error handling
 * throughout the database interaction process.
 * 
 * @class ZTeraDBConnection
 */
class ZTeraDBConnection {
  /**
   * Creates an instance of ZTeraDBConnect.
   * Initializes the connection manager using the provided configuration object and host details.
   * It verifies that all required configuration parameters are provided.
   * 
   * @param {string} ZTeraDBHost - The host address of the ZTeraDB server.
   * @param {number} ZTeraDBPort - The port number on which the ZTeraDB server is running.
   * @param {Object} ZTeraDBConfig - Configuration object that holds the database connection details.
   * @param {string} ZTeraDBConfig.clientKey - The unique client identifier used for authentication.
   * @param {string} ZTeraDBConfig.accessKey - The access key used for authenticating the connection.
   * @param {string} ZTeraDBConfig.secretKey - The secret key used for secure authentication.
   * @param {string} ZTeraDBConfig.databaseID - The database name used to execute the the schema query.
   * @param {string} ZTeraDBConfig.env - The database environment used to connect to the database. It can be dev, prod, staging, qa
   * @param {string} ZTeraDBConfig.responseDataType - The response data type. default "json"
   * @param {Object?} ZTeraDBConfig.options - Other connection options
   * @param {Object?} ZTeraDBConfig.options.connection_pool - Connection pool options
   * @param {number?} ZTeraDBConfig.options.connection_pool.min - Minimum number of connections in the connection pool
   * @param {number?} ZTeraDBConfig.options.connection_pool.max - Maximum number of connections in the connection pool
   * 
   * @throws {ZTeraDBError} Throws an error if any required configuration parameter is missing.
   */
  constructor(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig) {
    
    if (!ZTeraDBConfig || !ZTeraDBConfig.clientKey || !ZTeraDBConfig.accessKey || !ZTeraDBConfig.secretKey || !ZTeraDBHost || !ZTeraDBPort) {
      throw new ZTeraDBError("Invalid parameters", -1, "Missing required configuration parameters");
    }

    // Initialize connection manager instance
    this.connectionManager = new ZTeraDBConnectionManager(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);
  }

  /**
   * Executes a database query and returns the result as an async iterable.
   * This method is an asynchronous generator that allows the caller to iterate over the query results.
   * 
   * @async
   * @param {ZTeraDBQuery} query - The ZTeraDB query string to be executed.
   * @returns {Promise<Object>} - An async iterable that yields query results.
   * @returns {Promise<AsyncIterableIterator<Object>>} - An async iterable that yields query results.
   * 
   * @throws {Error} - If there is any issue with obtaining a connection, executing the query, or retrieving the results.
   */
  async run(query) {
    if (!query instanceof ZTeraDBQuery) {
      Promise.reject(new ZTeraDBError('Invalid Query', ResponseType.QUERY_ERROR, "'query' must be an instance of ZTeraDBQuery."));
    }

    // Obtain a database connection from the connection manager
    const connection = await this.connectionManager.getConnection();

    // Stop previous data
    // await connection.executeQuery({stop: true});

    // Execute the provided ZTeraDB query
    const response = await connection.executeQuery(query.generate(), this.connectionManager);

    // If the query is not select query then extract and return the query result.
    if(query.isSelectQuery() === false) {
      const { value, _ } = await response.next();

      // Return query result
      return Promise.resolve(value);
    }
    // Return the query result
    else {
      return response;
    }
  }

  /**
   * Closes the connection manager and releases all resources.
   * 
   * @returns {Promise<void>} - A promise that resolves when the connection manager is closed.
   */
  async close() {
    // Close the connection manager, cleaning up any active connections and resources
    return await this.connectionManager.close();
  }
}

export default ZTeraDBConnection;
