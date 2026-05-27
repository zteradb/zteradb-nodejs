/**
 * @file config/connection-pool.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB ConnectionPool (Database Resource Allocation) Configuration Engine
 * --------------------------------------------------------------------------
 * 
 *  @description
 *  The `ConnectionPool` helper manages database connection lifecycle boundaries,
 *  resource allocation safety checks, and parameter sanitization limits.
 *
 *  • Purpose  
 *      Maintains rigorous control over concurrent connection allocations to prevent
 *      database socket exhaustion or driver instantiation bottlenecks. It ensures
 *      the runtime engine operates within defined operational pool constraints.
 *
 *  • Responsibilities  
 *      - Expose fallback baseline connection settings via class property constants.
 *      - Resolve the fallback property hierarchy (User Object -> process.env -> System Defaults).
 *      - Enforce rigorous mathematical constraint rules (e.g., preventing `max` from being less than `min`).
 *
 *  • Extensibility  
 *      To introduce advanced pooling properties in the future (e.g., `idleTimeoutMillis` or `acquireTimeoutMillis`):  
 *        1. Add the properties to the `ConnectionPool` JSDoc `@typedef` contract block.
 *        2. Extend the validation boundary rules and default mappings inside the `.parse()` method.
 *
 * --------------------------------------------------------------------------
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

/**
 * @typedef {Object} ConnectionPool
 * @property {number} min - The minimum number of concurrent database connections to keep alive.
 * @property {number} max - The maximum limit of concurrent database connections allowed in the pool.
 */


/**
 * System baseline configuration fallbacks.
 * @private
 * @constant
 * @type {ConnectionPool}
 */
const DEFAULTS = { min: 0, max: 1 };


/**
 * Internal parsing utility to safely parse strings to integers using base-10 radix.
 * Falls back gracefully to a default parameter if parsing resolves to NaN or null pointers.
 * * @private
 * @param {any} val - The raw target input value to evaluate.
 * @param {number} fallback - The defensive parameter used if validation fails.
 * @returns {number} The validated base-10 integer representation or fallback value.
 */
const parseIntRadix = (val, fallback) => {
  if (val === undefined || val === null) return fallback;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * @class ConnectionPoolConfiguration
 * @description Processes, structures, and enforces operational constraints on connection pooling payloads.
 * Implements cascading fallback checking (User Settings -> Environment Scope -> Global System Defaults).
 */
class ConnectionPoolConfiguration {
  /** 
   * The minimum number of concurrent database connections to keep alive.
   * @type {number} 
   */
  min = DEFAULTS.min;

  /** 
   * The maximum limit of concurrent database connections allowed in the pool.
   * @type {number} 
   */
  max = DEFAULTS.max;

  /**
   * Parses, normalizes, and validates connection pool configurations.
   * Resolves the multi-tier cascading fallback hierarchy from inputs and environmental states.
   * 
   * @param {Partial<ConnectionPool>} userPool - The loose connection pool payload passed down from the options block.
   * @param {string[]} errorArray - Shared central error context tracker.
   * @returns {Readonly<ConnectionPool>} Fully sanitized, frozen connection pool property map.
   */
  parse(userPool = {}, errorArray) {
    // 1. Resolve and coerce the multi-layer fallback hierarchy
    const parsedMin = parseIntRadix(userPool.min ?? process.env.MIN_CONNECTION, DEFAULTS.min);
    const parsedMax = parseIntRadix(userPool.max ?? process.env.MAX_CONNECTION, DEFAULTS.max);

    // 2. Validate bounds and log contextual deviations to the central repository tracker
    if (typeof parsedMin !== "number" || parsedMin < 0) {
      errorArray.push(`Invalid options.connectionPool.min: "${parsedMin}" must be a non-negative number.`);
    }
    if (typeof parsedMax !== "number" || parsedMax < parsedMin) {
      errorArray.push(`Invalid options.connectionPool.max: "${parsedMax}" must be >= min (${parsedMin}).`);
    }

    // 3. Lock down properties to preserve engine state immutability
    return Object.freeze({ min: parsedMin, max: parsedMax });
  }
}

/**
 * Global Connection Pool Configuration Instance Singleton
 * * This module manages resource allocation limits, parameter sanitization, 
 * and logic verification for all persistent database connection boundaries.
 * * @type {ConnectionPoolConfiguration}
 */
const ConnectionPool = new ConnectionPoolConfiguration();

module.exports = ConnectionPool;