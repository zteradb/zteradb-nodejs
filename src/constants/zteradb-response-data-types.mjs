/**
 ** @file constants/zteradb-response-data-types.mjs
 *
 * --------------------------------------------------------------------------
 *  ZTeraDB ResponseDataTypes Enum
 * --------------------------------------------------------------------------
 *
 * @description
 *  The `ResponseDataTypes` object defines the allowable formats for data sent
 *  to the ZTeraDB client. It ensures pseudo-type safety by validating that only
 *  supported payload formats are used via strict immutability.
 *
 *  • Purpose  
 *      Provides a controlled set of immutable request type identifiers
 *      (currently only `json`). Prevents invalid formats from being passed into
 *      the payload delivery or configuration layers.
 *
 *  • Responsibilities  
 *      - Define supported request formats via frozen object properties.  
 *      - Validate user-supplied request body formats against allowed keys/values.  
 *
 *  • Extensibility  
 *      To support new request formats in the future (e.g., `json`, `binary`):  
 *        1. Add a new key-value pair (e.g., `JSON: "json",`)  
 *      Validation logic automatically scales with standard object utility features.
 *
 * --------------------------------------------------------------------------
 * @object ResponseDataTypes
 * @package zteradb.constants
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

/**
 * @typedef {Object} ResponseDataTypesMap
 * @property {string} JSON - JavaScript Object Notation text stream serialization identifier format.
 */

/**
 * Frozen dictionary enumeration representing supported transport payload formats.
 * This structure enforces runtime runtime immutability to prevent configuration pollution.
 * * Note: Standard configurations default to JSON string streams. Introduce secondary wire-level
 * formats (e.g., protoBuf, binary, msgpack) directly within this configuration block.
 * * @constant
 * @enum {string}
 * @type {Readonly<ResponseDataTypesMap>}
 */
const ResponseDataTypes = Object.freeze({
  // JSON request payload format serialization identifier.
  JSON: "json",
});

// Export structural serialization lookup table via CommonJS specification
export default ResponseDataTypes;
