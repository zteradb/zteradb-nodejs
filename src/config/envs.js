/**
 * @file config/envs.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB ENVS (Database Instance Environment) Engine
 * --------------------------------------------------------------------------
 *
 * @description
 *  The `ENVS` helper manages lifecycle configuration, runtime verification, 
 *  and structural alignment rules for allowed target deployment boundaries.
 *
 *  • Purpose  
 *      Provides a controlled set of immutable environment keys (`dev`, `staging`,
 *      `qa`, `prod`) linked with self-contained parsing engine mechanics. Prevents
 *      invalid or typo-ridden environment configurations from breaking the driver runtime.
 *
 *  • Responsibilities  
 *      - Expose target deployment configurations via class property constants.  
 *      - Encapsulate fallback lookup logic (User Object -> process.env -> System Defaults).  
 *      - Validate loose inputs against whitelisted target boundaries.
 *
 *  • Extensibility  
 *      To support new execution environments in the future (e.g., `local`, `uat`):  
 *        1. Add the environment string definition inside `RAW_MAP`.
 *        2. Map the public property constant down inside the class constructor layer.
 *
 * --------------------------------------------------------------------------
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

/**
 * @typedef {Object} ENVsStructure
 * @property {'dev'} DEV Local development environment.
 * @property {'staging'} STAGING Pre-production integration and staging environment.
 * @property {'qa'} QA Quality assurance and automated testing environment.
 * @property {'prod'} PROD Live, customer-facing production environment.
 */

const RAW_MAP = Object.freeze({
  DEV: "dev",
  STAGING: "staging",
  QA: "qa",
  PROD: "prod"
});

class ENVSConfiguration {
  /** @type {'dev'} Local development environment. */
  DEV = RAW_MAP.DEV;

  /** @type {'staging'} Pre-production integration and staging environment. */
  STAGING = RAW_MAP.STAGING;

  /** @type {'qa'} Quality assurance and automated testing environment. */
  QA = RAW_MAP.QA;

  /** @type {'prod'} Live, customer-facing production environment. */
  PROD = RAW_MAP.PROD;

  /**
   * Parses and normalizes the target execution environment boundary.
   * Handles the entire cascade fallback hierarchy: User Override -> process.env -> System Default.
   * 
   * @param {string | undefined} userEnv - The raw environment string explicitly passed by the client.
   * @param {string[]} errorArray - Shared central error context tracker.
   * @returns {string} The lowercased, whitelisted environment string.
   */
  parse(userEnv, errorArray) {
    // 1. Resolve the fallback hierarchy internally inside this module
    const rawEnv = userEnv ?? process.env.ZTERADB_ENV ?? RAW_MAP.DEV;

    // 2. Defend against non-string inputs and normalize to lowercase
    const env = typeof rawEnv === "string" ? rawEnv.toLowerCase() : String(rawEnv || "");
    const allowedEnvironments = Object.values(RAW_MAP);

    // 3. Validate against the strict allowed whitelist
    if (!allowedEnvironments.includes(env)) {
      errorArray.push(`Invalid env: "${rawEnv}" is not supported. Must be one of: ${allowedEnvironments.join(", ")}`);
      return RAW_MAP.DEV; // Safe graceful fallback
    }

    return env;
  }
}

/**
 * Database Instance Environment
 * 
 * This module manages the lifecycle configuration, verification, 
 * and structural alignment rules for allowed target runtimes.
 * 
 * @type {ENVSConfiguration & ENVsStructure}
 */
const ENVS = new ENVSConfiguration();

module.exports = ENVS;