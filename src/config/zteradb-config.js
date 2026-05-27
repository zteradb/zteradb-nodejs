/**
 * @file config/zteradb-config.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Config Factory
 * --------------------------------------------------------------------------
 *
 * @description
 *  The `ZTeraDBConfig` function serves as a dynamic, runtime configuration factory 
 *  for the ZTeraDB client. It safely merges user-defined overrides with system 
 *  environment variables (`process.env`) while enforcing type validation and object immutability.
 *
 *  • Purpose  
 *      Provides a safe, resilient, and validated initialization configuration for 
 *      the database engine. It standardizes mixed data types (strings, booleans, integers) 
 *      arriving from loose environments or user payloads into strict system types.
 *
 *  • Responsibilities  
 *      - Merge incoming user configuration parameters with environment defaults.  
 *      - Coerce unparsed inputs (like stringified booleans and numbers) into native types.  
 *      - Execute runtime validation checks to fail-fast on missing keys, unsupported environments, or logical boundary errors.  
 *      - Freeze the final nested configuration to prevent dangerous runtime mutations.
 *
 *  • Extensibility  
 *      To add or support new configuration keys in the future:  
 *        1. Destructure the new key from the `config` argument if nested.  
 *        2. Apply a strict coercion fallback mapping (e.g., using nullish coalescing `??`).  
 *        3. Append a data validation constraint inside the internal error evaluation array block.
 *
 * --------------------------------------------------------------------------
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

const ResponseDataTypes = require("@zteradb/client/constants/zteradb-response-data-types");
const ENVS = require("./envs");
const Options = require("./options");

/**
 * @typedef {Object} ZTeraDBInputConfig
 * @property {string} clientKey Unique client identifier string.
 * @property {string} accessKey Public-facing access authentication key.
 * @property {string} secretKey Private secure signing key.
 * @property {string} databaseID Target database cluster resource ID.
 * @property {'dev' | 'staging' | 'qa' | 'prod'} [env='dev'] Runtime target environment boundary.
 * @property {boolean} [use_tls=false] Force secure TLS connection handshakes.
 * @property {boolean} [verify_tls_host=false] Enforce rigorous remote certificate validations.
 * @property {'json' | 'buffer'} [responseDataType='json'] Desired default format for incoming records.
 * @property {import("./options").ZTeraDBOptions} [options] Deep driver and resource orchestration configurations.
 */

const DEFAULTS = Object.freeze({
  env: "dev",
  use_tls: false,
  verify_tls_host: false,
  responseDataType: ResponseDataTypes.JSON,
  options: Object.freeze({
    connectionPool: Object.freeze({
      min: 0,
      max: 1
    })
  })
});

// Helper utilities for strict type coercion
const parseBool = (val) => val === "true" || val === true;

const parseIntRadix = (val, fallback) => {
  if (val === undefined || val === null) return fallback;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? fallback : parsed;
};


/**
 * ZTeraDBConfig
 *
 * Validates, builds, and locks down a dynamic system configuration structure.
 * 
 * Notes for Developers:
 * ---------------------
 * - User-supplied object properties explicitly supersede process.env structures.
 * - Employs nullish coalescing (??) instead of logical OR (||) to permit intentional 0 or false overrides.
 * - Environment inputs are strictly validated against 'dev', 'prod', 'staging', and 'qa'.
 * - Deep freezes three key nested structural boundaries (`finalConfig`, `options`, `connectionPool`).
 *
 * @param {Object} [config={}] - Optional custom overrides provided by the user.
 * @returns {Readonly<Object>} Complete, validated, and structurally frozen ZTeraDB configuration.
 * @throws {Error} High-visibility composite error containing all missing fields, environment mismatches, or structural type errors.
 */
function ZTeraDBConfig(config = {}) {
  // Runtime Structural Verification Layer
  const errors = [];

  const userBase = config || {};
  const userOptions = config.options || {};

  const clientKey = userBase.clientKey ?? process.env.CLIENT_KEY ?? "";
  const accessKey = userBase.accessKey ?? process.env.ACCESS_KEY ?? "";
  const secretKey = userBase.secretKey ?? process.env.SECRET_KEY ?? "";
  const databaseID = userBase.databaseID ?? process.env.DATABASE_ID ?? "";
  const env = ENVS.parse(userBase.env, errors);

  const use_tls = parseBool(userBase.use_tls ?? process.env.USE_TLS ?? DEFAULTS.use_tls);
  const verify_tls_host = parseBool(userBase.verify_tls_host ?? process.env.VERIFY_TLS_HOST ?? DEFAULTS.verify_tls_host);
  const responseDataType = userBase.responseDataType ?? DEFAULTS.responseDataType;
  const verifiedOptions = Options.parse(userOptions, errors);

  if (!clientKey) errors.push("Missing required field: clientKey (or process.env.CLIENT_KEY)");
  if (!accessKey) errors.push("Missing required field: accessKey (or process.env.ACCESS_KEY)");
  if (!secretKey) errors.push("Missing required field: secretKey (or process.env.SECRET_KEY)");
  if (!databaseID) errors.push("Missing required field: databaseID (or process.env.DATABASE_ID)");

  if (errors.length > 0) {
    throw new Error(`[ZTeraDBConfig Validation Error]:\n - ${errors.join("\n - ")}`);
  }


  // Synthesize complete configuration payload
  const finalConfig = {
    clientKey,
    accessKey,
    secretKey,
    databaseID,
    env,
    use_tls,
    verify_tls_host,
    responseDataType,
    options: verifiedOptions,
  };

  // Prevent downstream mutation across deep configuration properties
  Object.freeze(finalConfig);
  Object.freeze(finalConfig.options);
  Object.freeze(finalConfig.options.connectionPool);

  return finalConfig;
}

module.exports = ZTeraDBConfig;