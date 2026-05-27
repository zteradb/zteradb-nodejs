/**
 * @file config/options.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Options Configuration Engine Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the ZTeraDB nested options configuration gateway. Manages composite 
 * property routing and delegates schema parsing responsibilities down to specific 
 * structural driver sub-modules (e.g., ConnectionPool).
 *
 * @example
 * import Options from './config/options.js';
 * const errors: string[] = [];
 * const runtimeOptions = Options.parse({ connectionPool: { min: 2 } }, errors);
 * console.log(runtimeOptions.connectionPool.max);
 *
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import ConnectionPool, { ConnectionPoolShape } from "@zteradb/client/config/connection-pool";

/**
 * Interface representation mapping acceptable user configuration options input structures.
 */
export interface ZTeraDBOptionsInput {
  /** Advanced connection pooling tuning parameters. */
  connectionPool?: Partial<ConnectionPoolShape>;
  [key: string]: any;
}

/**
 * Interface representation detailing the compiled, immutable output format of the parsed options block.
 */
export interface ZTeraDBOptionsOutput {
  /** Fully sanitized, frozen connection pool property map. */
  readonly connectionPool: ConnectionPoolShape;
}

/**
 * Processes, routes, and delegates nested configurations down to dedicated sub-module owners.
 */
declare class OptionsConfiguration {
  /** * Linked connection pool configuration submodule instance reference.
   */
  connectionPool: typeof ConnectionPool;

  /**
   * Parses, normalizes, and validates the nested options configuration layer.
   * Delegates structural property validations downstream to specific module handlers.
   * * @param userOptions - The loose raw options parameter payload passed by the client.
   * @param errorArray - Shared central error context string tracker appended to on validation failure.
   * @returns Fully sanitized, permanently frozen options configuration layer output block.
   */
  parse(
    userOptions?: ZTeraDBOptionsInput, 
    errorArray?: string[]
  ): Readonly<ZTeraDBOptionsOutput>;
}

/**
 * Exported unified Driver Options Management Context instance.
 */
declare const Options: OptionsConfiguration;

export default Options;