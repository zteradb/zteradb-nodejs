/**
 * @file config/connection-pool.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB ConnectionPool Configuration Engine Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the database connection pool configuration engine. Handles cascading 
 * fallback evaluations (User Object -> process.env -> System Defaults) and enforces 
 * resource bound safety constraints on parsed pooling limits.
 *
 * @example
 * import ConnectionPool from './config/connection-pool.js';
 * const errors: string[] = [];
 * const config = ConnectionPool.parse({ min: 2, max: 10 }, errors);
 * console.log(config.min); // Outputs: 2
 *
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

/**
 * Concrete configuration mapping tracking connection bounds.
 */
export interface ConnectionPoolShape {
  /** The minimum number of concurrent database connections to keep alive. */
  min: number;
  /** The maximum limit of concurrent database connections allowed in the pool. */
  max: number;
}

/**
 * Processes, structures, and enforces operational constraints on connection pooling payloads.
 */
declare class ConnectionPoolConfiguration {
  /** * The minimum number of concurrent database connections to keep alive.
   */
  min: number;

  /** * The maximum limit of concurrent database connections allowed in the pool.
   */
  max: number;

  /**
   * Parses, normalizes, and validates connection pool configurations.
   * Resolves the multi-tier cascading fallback hierarchy from inputs and environmental states.
   * * @param userPool - The loose connection pool payload passed down from the options block.
   * @param errorArray - Shared central error context string tracker appended to on failure.
   * @returns Fully sanitized, deeply frozen connection pool property map.
   */
  parse(
    userPool?: Partial<ConnectionPoolShape>, 
    errorArray?: string[]
  ): Readonly<ConnectionPoolShape>;
}

/**
 * Exported unified ConnectionPool Configuration Context instance.
 */
declare const ConnectionPool: ConnectionPoolConfiguration & ConnectionPoolShape;

export default ConnectionPool;