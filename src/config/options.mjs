/**
 * @file config/options.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Options (Driver & Resource Orchestration) Configuration Engine
 * --------------------------------------------------------------------------
 *
 * @description
 *  The `Options` configuration layer serves as an intermediary controller that 
 *  manages deep driver customization properties and structural sub-modules.
 *
 *  • Purpose  
 *      Acts as a central gateway for complex, non-root configurations (such as 
 *      connection pools, query retry policies, or timeout parameters). It insulates 
 *      the main configuration engine from knowing the exact internal schema rules of 
 *      deeply nested modules.
 *
 *  • Responsibilities  
 *      - Function as the primary responsibility layer for options block validation.
 *      - Expose and bind downstream engine objects (`ConnectionPool`) for Intellisense tracking.
 *      - Orchestrate structural data parsing by passing relevant sub-objects down to their owners.
 *
 *  • Extensibility  
 *      To add new advanced driver configuration modules in the future (e.g., `retries` or `timeouts`):  
 *        1. Define the property properties inside the `ZTeraDBOptions` JSDoc template.
 *        2. Import and delegate the parsing layer to the corresponding config helper inside `.parse()`.
 *
 * --------------------------------------------------------------------------
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

import ConnectionPool from "@zteradb/client/config/connection-pool";

/**
 * @typedef {Object} ZTeraDBOptions
 * @property {Partial<import("./connection-pool").ConnectionPool>} [connectionPool] Advanced connection pooling tuning parameters.
 */

class OptionsConfiguration {
  /** 
   * Linked connection pool configuration submodule instance reference.
   * @type {typeof ConnectionPool} 
   */
  connectionPool = ConnectionPool;

  /**
   * Parses, normalizes, and validates the nested options configuration layer.
   * Delegates the validation responsibilities down to specific structural sub-modules.
   * 
   * @param {ZTeraDBOptions} userOptions - The loose raw options parameter payload passed by the client.
   * @param {string[]} errorArray - Shared central error context tracker.
   * @returns {Readonly<{connectionPool: import("./connection-pool").ConnectionPool}>} Fully sanitized, frozen options configuration layer.
   */
  parse(userOptions = {}, errorArray) {
    // 1. Extract the nested raw connection pool block safely
    const userPool = userOptions.connectionPool || {};

    // 2. Delegate responsibility downstream to the ConnectionPool module
    const parsedPool = ConnectionPool.parse(userPool, errorArray);

    // 3. Assemble and permanently secure the operational options block
    return Object.freeze({
      connectionPool: parsedPool
    });
  }
}

/**
 * Driver Options Management Context
 * 
 * This module manages the structural composition, error checking, and safely 
 * nested parsing boundaries for all deep driver configuration properties.
 * 
 * @type {OptionsConfiguration}
 */
const Options = new OptionsConfiguration();

export default Options;