/**
 * @file constants/zteradb-response-data-types.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB ResponseDataTypes Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * The `ResponseDataTypes` enum defines the allowable formats for data sent
 * to the ZTeraDB client. It ensures pseudo-type safety by validating that only
 * supported payload formats are used via strict immutability.
 *
 * @example
 * import ResponseDataTypes from './constants/zteradb-response-data-types.js';
 * const payloadFormat: ResponseDataTypes = ResponseDataTypes.JSON; // Evaluates to: "json"
 *
 * @package     zteradb.constants
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 * --------------------------------------------------------------------------
 */

/**
 * Enumeration mapping for supported transport payload serialization formats.
 */
export const enum ResponseDataTypes {
  // =========================================================================
  // Transport & Serialization Formats
  // =========================================================================
  /** JavaScript Object Notation text stream serialization identifier format. */
  JSON = "json",
}

export default ResponseDataTypes;