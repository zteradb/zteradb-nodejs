/**
 * @file zteradb-connection.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Connection Class
 * --------------------------------------------------------------------------
 * 
 * @description
 * ZTeraDB Client Connection and Authentication Module.
 * This module provides the core orchestration layer for interacting with a ZTeraDB instance.
 * It manages connection lifecycles via pooling, enforces cryptographic authentication handshakes,
 * buffers incoming TCP packet streams, and provides async generator entry points for high-performance
 * query execution.
 * 
 * @dependencies 
 * - `ResponseTypes`: Protocol constants mapping server state transitions.
 * - `ZTeraDBError`: Structured exceptions wrapping localized database fault states.
 * - `ZTeraDBQuery`: Abstract Syntax Tree representation of downstream queries.
 * - `ZTeraDBClientAuth`: Cryptographic signature generator for client handshakes.
 * - `ZTeraDBProtocol`: Low-level TCP frame pipeline implementation.
 * 
 * @example
 * import ZTeraDBConnection from './zteradb-connection';
 * import ZTeraDBQuery from '../query/zteradb-query';
 * * const config = {
 * clientKey: 'client_id_001',
 * accessKey: 'access_abc123',
 * secretKey: 'super_secret_token',
 * options: { connectionPool: { min: 2, max: 10 } }
 * };
 * * const db = new ZTeraDBConnection('localhost', 7777, config);
 * const query = new ZTeraDBQuery().select('*').from('users');
 * * const records = await db.run(query);
 * for await (const row of records) {
 * console.log(row);
 * }
 * * await db.close();
 * 
 * @class       ZTeraDBConnection
 * @package     zteradb.connection
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

const ResponseType = require('@zteradb/client/constants/zteradb-response-types');
const { ZTeraDBError } = require('@zteradb/client/helper/zteradb-exception');
const ZTeraDBQuery = require('@zteradb/client/query');
const ZTeraDBClientAuth = require('@zteradb/client/auth/client-auth');
const ZTeraDBProtocol = require('@zteradb/client/protocol/zteradb-protocol');


/**
 * @class ZTeraDBConnectionManager
 * @description Manages a deterministic pool of connection pipes communicating with a ZTeraDB node.
 * Coordinates connection throttling using a dynamic allocation matrix governed by config limits,
 * managing explicit state queues (`availableConnections`, `runningConnections`, and `waitQueue`).
 */
class ZTeraDBConnectionManager {
  /**
   * Initializes the pool orchestrator with targeted limits and networking parameters.
   * * @param {string} ZTeraDBHost - The remote server network address or domain identifier.
   * @param {number} ZTeraDBPort - The targeted TCP socket gateway port.
   * @param {Object} ZTeraDBConfig - Connection initialization settings.
   * @param {string} ZTeraDBConfig.clientKey - Identification string assigned to the client.
   * @param {string} ZTeraDBConfig.accessKey - Explicit system level authorization identity.
   * @param {string} ZTeraDBConfig.secretKey - SHA256-hashed target for auth challenges.
   * @param {Object} [ZTeraDBConfig.options] - Extended pool configuration parameters.
   * @param {Object} [ZTeraDBConfig.options.connectionPool] - Targeted pool thresholds.
   * @param {number} [ZTeraDBConfig.options.connectionPool.min] - Minimum persistent idle pipes.
   * @param {number} [ZTeraDBConfig.options.connectionPool.max] - Hard limit ceiling for open pools.
   */
  constructor(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig) {
    this.host = ZTeraDBHost;              // Database server hostname / IP address
    this.port = ZTeraDBPort;              // Database server designated port
    this.ZTeraDBConfig = ZTeraDBConfig;   // Complete payload configuration reference
    this.availableConnections = [];       // Array tracking idle, ready-to-use active connection streams
    this.runningConnections = new Set();  // Set keeping unique track of busy, in-flight transaction streams
    this.initializingDatabase = false;    // System latch preventing overlapping worker allocation cycles
    this.waitQueue = [];                  // Execution priority FIFO queue handling connection starvation states
    
    // Evaluate operational boundary criteria configurations
    this.hasMinConnectionPoolOption = ZTeraDBConfig && ZTeraDBConfig.options && ZTeraDBConfig.options.connectionPool && ZTeraDBConfig.options.connectionPool.min > 0;
    this.hasMaxConnectionPoolOption = ZTeraDBConfig && ZTeraDBConfig.options && ZTeraDBConfig.options.connectionPool && ZTeraDBConfig.options.connectionPool.max > 0;

    this.minConnections = this.hasMinConnectionPoolOption ? ZTeraDBConfig.options.connectionPool.min : 0;
    this.maxConnections = this.hasMaxConnectionPoolOption ? ZTeraDBConfig.options.connectionPool.max : 0;
    
    // Seed and spawn asynchronous connection components if matching boundaries are active
    if (this.minConnections > 0) {
      this.initializingDatabase = true;
      this.initPromise = this.makeMinConnections();
    }
  }

  /**
   * Creates a brand new individual connection worker stream and executes the network-level authorization handshake.
   * * @async
   * @protected
   * @returns {Promise<ZTeraDBProtocol>} Resolves to an initialized, certified protocol stream.
   * @throws {ZTeraDBError} Thrown if network validation steps fail or remote server declines authorization.
   */
  async createNewConnection() {
    const clientAuth = new ZTeraDBClientAuth(this.ZTeraDBConfig);
    const connection = new ZTeraDBProtocol(this.host, this.port, this.ZTeraDBConfig, clientAuth);

    // Trigger explicit SHA256 authorization phase across the network pipe
    const serverAuth = await connection.authenticate();
    if (serverAuth && serverAuth.access_token) {
      return connection;
    }

    throw new ZTeraDBError(
      "Authentication failed",
      ResponseType.CONNECT_ERROR,
      "Server did not return access token"
    );
  }

  /**
   * Retrieves an operational socket link from the tracking matrix. 
   * Defers to queues or provisions new pipelines dynamically if the application parameters match constraints.
   * * @async
   * @returns {Promise<ZTeraDBProtocol>} A verified network context connection pipe.
   * @throws {ZTeraDBError} Thrown if maximum constraints are reached and wait tasks exceed the 30-second timeout.
   */
  async getConnection() {
    // Block execution threads until initialization logic fulfills completely
    if (this.initPromise) {
      await this.initPromise;
    }

    // Phase 1: Prioritize quick retrieval of pre-warmed idle links
    let connection = this.availableConnections.pop();
    if (connection) {
      this.runningConnections.add(connection);
      return connection;
    }

    const totalConnections = this.availableConnections.length + this.runningConnections.size;

    // Phase 2: Scale pool dynamically up to structural max boundaries if capacity permits
    if (this.maxConnections === 0 || totalConnections < this.maxConnections) {
      connection = await this.createNewConnection();
      this.runningConnections.add(connection);
      return connection;
    }

    // Phase 3: Total capacity reached. Queue the calling reference with structural error boundaries
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new ZTeraDBError(
          "Pool timeout",
          ResponseType.CONNECT_ERROR,
          "Connection pool exhausted"
        ));
      }, 30000); // 30-second boundary threshold

      this.waitQueue.push({
        resolve: (conn) => {
          clearTimeout(timeout);
          resolve(conn);
        },
        reject
      });
    });
  }

  /**
   * Asynchronously provisions the baseline volume of sockets defined inside configuration initializers.
   * * @async
   * @private
   * @returns {Promise<void>} Resolves once baseline target arrays map to configured thresholds.
   */
  async makeMinConnections() {
    const tasks = [];

    // Bundle multi-threaded promises into a singular resolution task array
    for (let i = 0; i < this.minConnections; i++) {
      tasks.push(this.createNewConnection());
    }

    const conns = await Promise.all(tasks);
    this.availableConnections.push(...conns);
  }

  /**
   * Returns a processing connection pipe back to the pool allocation schema.
   * Directly intercepts wait queues to bypass resource context-switching overhead.
   * * @async
   * @param {ZTeraDBProtocol} connection - The pipeline reference instance returned from the runtime environment.
   * @returns {Promise<void>}
   */
  async releaseConnection(connection) {
    this.runningConnections.delete(connection);

    // Shortcut routing: Hand connection context over directly to trailing task queues if present
    if (this.waitQueue.length > 0) {
      const waiter = this.waitQueue.shift();
      this.runningConnections.add(connection);
      waiter.resolve(connection);
      return;
    }

    // Normal routing: Safe storage back into pool allocations array
    this.availableConnections.push(connection);
  }

  /**
   * Executes sweeping cleanup operations on all network sockets tracked inside the application framework.
   * * @async
   * @returns {Promise<boolean>} Resolves tracking state flags to true when closed completely without error.
   * @throws {ZTeraDBError} Thrown if pipeline context termination processes encounter unexpected network faults.
   */
  async close() {
    try {
      // Step 1: Clean idle sockets
      for (const conn of this.availableConnections) {
        if (conn) await conn.close();
      }
  
      // Step 2: Clear processing pipeline sockets
      for (const conn of this.runningConnections) {
        if (conn) await conn.close();
      }
    } catch (error) {
      throw new ZTeraDBError(
        "Connection error", 
        -1, 
        "Unable to close all database connections"
      );
    }

    return true;
  }
}


/**
 * @class ZTeraDBConnection
 * @description Primary high-level interface designed for consumer application implementations.
 * Encapsulates management operations, structures database execution boundaries, and wraps transactional response data
 * using robust ECMAScript asynchronous streaming generators.
 */
class ZTeraDBConnection {
  /**
   * Constructs the main application-facing ZTeraDB endpoint controller.
   * Validates parameter signatures thoroughly before preparing local orchestration instances.
   * * @param {string} ZTeraDBHost - Server deployment target destination IP address or domain string.
   * @param {number} ZTeraDBPort - Database communications access port.
   * @param {Object} ZTeraDBConfig - Core encryption credentials array payload.
   * @throws {ZTeraDBError} Thrown if key initialization components or server credentials match null parameter states.
   */
  constructor(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig) {
    if (!ZTeraDBConfig || !ZTeraDBConfig.clientKey || !ZTeraDBConfig.accessKey || !ZTeraDBConfig.secretKey || !ZTeraDBHost || !ZTeraDBPort) {
      throw new ZTeraDBError("Invalid parameters", -1, "Missing required configuration parameters");
    }

    // Instantiate localized database allocation manager engine 
    this.connectionManager = new ZTeraDBConnectionManager(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);
  }

  /**
   * Submits structured queries to the remote storage clusters. Returns stream-wrapped mutations or iterable result rows.
   * * @async
   * @param {ZTeraDBQuery} query - The formatted AST query instance built for transaction processing.
   * @returns {Promise<any|AsyncIterableIterator<any>>} Returns single payload objects for standard mutations, or 
   * sequential data iterators for complex structured select engines.
   * @throws {ZTeraDBError} Thrown if incoming parameters fail structural safety validations or the server catches query syntax errors.
   */
  async run(query) {
    if (!(query instanceof ZTeraDBQuery)) {
      throw new ZTeraDBError(
        'Invalid Query', 
        ResponseType.QUERY_ERROR, 
        "'query' must be an instance of ZTeraDBQuery."
      );
    }

    // Route connection request allocations to pool engine matrix
    const connection = await this.connectionManager.getConnection();

    // Fire low-level network call using generated target parameters
    const response = await connection.executeQuery(query.generate(), this.connectionManager);

    // Structural optimization: Short-circuit streaming generators for direct transaction operations (e.g. UPDATE, INSERT)
    if (query.isSelectQuery() === false) {
      const { value } = await response.next();
      return Promise.resolve(value);
    }
    
    // Return standard ongoing asynchronous multi-packet reader data streams
    return response;
  }

  /**
   * Tears down downstream socket connections gracefully and safely updates allocation maps.
   * * @async
   * @returns {Promise<boolean>} True when resources terminate successfully.
   */
  async close() {
    return await this.connectionManager.close();
  }
}

// Export structural class via CommonJS specification
module.exports = ZTeraDBConnection;