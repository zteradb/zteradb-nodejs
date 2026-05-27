/**
 * @file zteradb-connection.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Connection Pool and Controller Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the orchestration layer interacting with a ZTeraDB node instance.
 * Houses definitions for the high-level connection client and the low-level 
 * transactional connection pool manager.
 *
 * @dependencies 
 * - `ZTeraDBQuery`: Abstract Syntax Tree wrapper parsing query criteria structures.
 * - `ZTeraDBProtocol`: Network layer stream driver handling frame operations.
 *
 * @example
 * import ZTeraDBConnection from './zteradb-connection.js';
 * import ZTeraDBQuery from '../query/zteradb-query.js';
 * * const config = {
 * clientKey: 'client_id_001',
 * accessKey: 'access_abc123',
 * secretKey: 'super_secret_token',
 * options: { connectionPool: { min: 2, max: 10 } }
 * };
 * * const db = new ZTeraDBConnection('localhost', 7777, config);
 * const query = new ZTeraDBQuery('users').select();
 * const stream = await db.run(query);
 *
 * @class       ZTeraDBConnection
 * @package     zteradb.connection
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import ZTeraDBQuery from "@zteradb/client/query";
import ZTeraDBProtocol from "@zteradb/client/protocol/zteradb-protocol.mjs";

/**
 * Interface detailing explicit initialization parameters and credential sets.
 */
export interface ZTeraDBConnectionConfig {
  clientKey: string;
  accessKey: string;
  secretKey: string;
  options?: {
    connectionPool?: {
      min?: number;
      max?: number;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Structural design format tracking deferred promise operations inside execution queues.
 */
interface DeferredWaiter {
  resolve: (connection: ZTeraDBProtocol) => void;
  reject: (error: any) => void;
}

/**
 * Manages a deterministic pool of active connection pipes communicating with a ZTeraDB node.
 */
declare class ZTeraDBConnectionManager {
  host: string;
  port: number;
  ZTeraDBConfig: ZTeraDBConnectionConfig;
  protected availableConnections: ZTeraDBProtocol[];
  protected runningConnections: Set<ZTeraDBProtocol>;
  protected initializingDatabase: boolean;
  protected waitQueue: DeferredWaiter[];
  protected hasMinConnectionPoolOption: boolean;
  protected hasMaxConnectionPoolOption: boolean;
  protected minConnections: number;
  protected maxConnections: number;
  protected initPromise?: Promise<void>;

  constructor(ZTeraDBHost: string, ZTeraDBPort: number, ZTeraDBConfig: ZTeraDBConnectionConfig);

  /**
   * Spawns an individual connection pipe and evaluates authentication states.
   */
  protected createNewConnection(): Promise<ZTeraDBProtocol>;

  /**
   * Retrieves an available idle link or structures dynamic additions based on capacity.
   */
  getConnection(): Promise<ZTeraDBProtocol>;

  /**
   * Asynchronously warms the resource matrix with configured baseline socket limits.
   */
  protected makeMinConnections(): Promise<void>;

  /**
   * Releases an execution context back into structural array configurations.
   */
  releaseConnection(connection: ZTeraDBProtocol): Promise<void>;

  /**
   * Sweeps active tracked environments and closes raw network connections gracefully.
   */
  close(): Promise<boolean>;
}

/**
 * Primary high-level interface designed for consumer application implementations.
 */
declare class ZTeraDBConnection {
  protected connectionManager: ZTeraDBConnectionManager;

  /**
   * Constructs the main application-facing ZTeraDB endpoint controller.
   */
  constructor(ZTeraDBHost: string, ZTeraDBPort: number, ZTeraDBConfig: ZTeraDBConnectionConfig);

  /**
   * Submits structured queries to the remote storage clusters.
   * * Returns a direct value payload promise for standard mutations (INSERT/UPDATE/DELETE),
   * or a stream-wrapped AsyncGenerator matrix when evaluating SELECT queries.
   */
  run(query: ZTeraDBQuery): Promise<any | AsyncGenerator<any, void, unknown>>;

  /**
   * Tears down downstream socket connections gracefully and safely updates allocation maps.
   */
  close(): Promise<boolean>;
}

export default ZTeraDBConnection;