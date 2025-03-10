/**
 * ZTeraDBConnection is a class that provides a higher-level interface for connecting to a ZTeraDB database,
 * executing queries, and handling results. It ensures proper connection management and error handling
 * throughout the database interaction process.
 *
 * @class ZTeraDBConnection
 */
export class ZTeraDBConnection {
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
    constructor(ZTeraDBHost: string, ZTeraDBPort: number, ZTeraDBConfig: {
        clientKey: string;
        accessKey: string;
        secretKey: string;
        databaseID: string;
        env: string;
        responseDataType: string;
        options: any | null;
    });
    connectionManager: ZTeraDBConnectionManager;
    /**
     * Executes a database query and returns the result as an async iterable.
     * This method is an asynchronous generator that allows the caller to iterate over the query results.
     *
     * @async
     * @param {ZTeraDBQuery} query - The ZTeraDB query string to be executed.
     * @returns {AsyncIterableIterator<Object>} - An async iterable that yields query results.
     *
     * @throws {Error} - If there is any issue with obtaining a connection, executing the query, or retrieving the results.
     */
    run(query: ZTeraDBQuery): AsyncIterableIterator<any>;
    /**
     * Closes the connection manager and releases all resources.
     *
     * @returns {Promise<void>} - A promise that resolves when the connection manager is closed.
     */
    close(): Promise<void>;
}
/**
 * ZTeraDBConnectionManager is a class that manages database connections for a Teradata database system.
 * It uses a connection pool to reuse existing connections or create new ones when necessary.
 * The class provides methods to acquire a connection, release it back to the pool, and close all connections.
 */
declare class ZTeraDBConnectionManager {
    /**
     * Creates an instance of ZTeraDBConnectionManager to manage database connections.
     *
     * @param {string} ZTeraDBHost - The hostname or IP address of the database server.
     * @param {number} ZTeraDBPort - The port number for connecting to the database server.
     * @param {Object} ZTeraDBConfig - Configuration object for setting up the connection manager.
     * @param {string} ZTeraDBConfig.clientKey - The client key for authentication.
     * @param {string} ZTeraDBConfig.accessKey - The access key for authentication.
     * @param {string} ZTeraDBConfig.secretKey - The secret key for authentication.
     * @param {string} ZTeraDBConfig.databaseID - The database name used to execute the the schema query.
     */
    constructor(ZTeraDBHost: string, ZTeraDBPort: number, ZTeraDBConfig: {
        clientKey: string;
        accessKey: string;
        secretKey: string;
        databaseID: string;
    });
    host: string;
    port: number;
    availableConnections: any[];
    runningConnections: any[];
    clientAuth: ZTeraDBClientAuth;
    initializingDatabase: boolean;
    hasMinConccectionPoolOption: boolean;
    hasMaxConccectionPoolOption: boolean;
    minConnections: any;
    maxConnections: any;
    createNewConnection(): Promise<ZTeraDBConnect>;
    /**
     * Retrieves a database connection from the pool. If no connection is available, a new one is created.
     *
     * @returns {Promise<ZTeraDBConnection>} - A promise that resolves to a database connection object.
     */
    getConnection(): Promise<ZTeraDBConnection>;
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
    makeMinConnections(): Promise<void>;
    /**
     * Releases a database connection back to the pool, making it available for reuse.
     *
     * @param {ZTeraDBConnect} connection - The connection object to be released back to the pool.
     */
    releaseConnection(connection: ZTeraDBConnect): Promise<void>;
    /**
     * Closes all database connections, both active and idle, in the pool.
     *
     * @returns {Promise<void>} - A promise that resolves when all connections are closed.
     */
    close(): Promise<void>;
}
import { ZTeraDBQuery } from "zteradb/src/lib/zteradb-query";
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
declare class ZTeraDBClientAuth {
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
    constructor({ clientKey, accessKey, secretKey, databaseID, nonce, requestToken }: {
        clientKey: string;
        accessKey: string;
        secretKey: string;
        databaseID: string;
        nonce: string;
        requestToken: string;
    });
    clientKey: string;
    accessKey: string;
    secretKey: string;
    databaseID: string;
    nonce: string;
    requestToken: string;
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
    generateNonce(): void;
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
    generateRequestToken(): string;
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
    generateAuthRequest(): any;
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
 * const connection = new ZTeraDBConnect(host, port);
 * connection.connect()
 *   .then(() => {
 *     console.log('Connected to ZTeraDB');
 *     connection.sendRequest(query)
 *       .then(response => console.log('Query Response:', response))
 *       .catch(error => console.error('Query failed:', error));
 *   })
 *   .catch(error => console.error('Connection failed:', error));
 */
declare class ZTeraDBConnect {
    /**
     * Creates an instance of ZTeraDBConnection.
     * @param {string} host - The hostname or IP address of the ZTeraDB service.
     * @param {number} port - The port number to connect to the ZTeraDB service.
     * @param {Object} clientAuth - An instance of ZTeraDBClientAuth.
     */
    constructor(host: string, port: number, clientAuth: any);
    host: string;
    port: number;
    clientAuth: any;
    connection: net.Socket;
    isConnecting: boolean;
    defaultBuffer: Buffer;
    buffer: any[];
    dataHandler: () => void;
    maxBufferSize: number;
    /**
     * Manages buffer size by checking if it exceeds the maximum limit.
     * If the buffer exceeds the limit, it retains only the newest half of the buffer.
     */
    manageBufferSize(): void;
    /**
     * Waits for the connection to be established if a connection is already in progress.
     * This is useful for avoiding multiple concurrent connection attempts.
     * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection.
     */
    waitForConnection(): Promise<net.Socket>;
    /**
     * Retrieves an existing connection if it is active, or establishes a new one.
     * This method handles the case where a connection is being established concurrently.
     * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection.
     */
    getConnection(): Promise<net.Socket>;
    /**
     * Establishes a connection to the ZTeraDB service and returns the active socket connection.
     * @returns {Promise<net.Socket>} A promise that resolves to the active socket connection once connected.
     */
    connectToServer(): Promise<net.Socket>;
    /**
     * Processes incoming data by adding it to the internal buffer.
     * If a data handler is defined, it will be triggered to process the data.
     * @param {Buffer} data - The data received from the server.
     */
    handleIncomingData(data: Buffer): void;
    /**
     * Resets the connection when the connection ends.
     * This should be called when the server closes the connection.
     */
    handleConnectionEnd(): void;
    /**
     * Handles errors during the connection process.
     * @param {Error} err - The error encountered during connection.
     * @throws {ZTeraDBError} Custom error class with a specific message.
     */
    handleConnectionError(err: Error): void;
    /**
     * Sends data over the connection. The data is serialized into JSON and sent as a buffer.
     * @param {net.Socket} connection - The socket connection to send the data through.
     * @param {Object} data - The data to be sent (typically a query or a message).
     * @returns {Promise<boolean>} A promise that resolves to true if the data is successfully sent.
     */
    send(connection: net.Socket, data: any): Promise<boolean>;
    /**
     * Creates a message buffer by encoding the data into a JSON string,
     * calculating its length, and prepending the length to the data.
     * @param {Object} data - The data to be sent (typically a JSON object).
     * @returns {Buffer} The complete buffer containing the message length and the data.
     */
    createMessageBuffer(data: any): Buffer;
    /**
     * Executes a query on the connection by sending the query to the ZTeraDB service.
     * The query is sent as a JSON object containing the authentication details and the query string.
     * @param {string} query - The SQL query string to be executed on the server.
     * @returns {Promise<void>} A promise that resolves once the query is sent to the server.
     */
    executeQuery(query: string, connectionManager: any): Promise<void>;
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
    getData(connectionManager: any): AsyncGenerator<any | null, void, unknown>;
    /**
     * Extracts and returns the appropriate response data based on the parsed response.
     * The method checks for error conditions, handles different response codes, and returns
     * the relevant data or error message.
     *
     * @param {Object} parsedResponse - The parsed response from the server.
     * @returns {Object|null} - The data extracted from the response, or `null` for completed queries or unrecognized response codes.
     */
    handleResponse(parsedResponse: any, connectionManager?: boolean): any | null;
    /**
     * Authenticates the connection using provided client keys.
     * Sends an authentication request and waits for the server's response.
     * If successful, stores the authentication data in the connection object.
     *
     * @returns {Object} The authentication response data from the server.
     * @throws {Error} If there is no response or if authentication fails.
     */
    authenticate(): any;
    /**
     * Closes the current connection gracefully.
     * If the connection exists, it attempts to close it and then nullifies the connection.
     * The method also handles potential errors during the close process.
     *
     * @returns {Promise<void>} A promise that resolves once the connection is closed, or rejects with an error if the close fails.
     */
    close(): Promise<void>;
}
import net = require("net");
