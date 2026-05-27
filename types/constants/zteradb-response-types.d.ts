/**
 * @file constants/zteradb-response-types.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB ResponseType Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Enumeration of response types used for communication with the ZTeraDB service.
 * This declaration file maps the protocol operation status codes returned by the
 * remote server to verify runtime states and handle data exceptions securely.
 *
 * @example
 * import ResponseType from './constants/zteradb-response-types.js';
 * const isConnected = ServerequestType === ResponseType.CONNECTED;
 *
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

export type ResponseTypeMap = {
  // =========================================================================
  // Operational Success States (0x0002 - 0x0202)
  // =========================================================================
  /** Explicit null placeholder indicating a fallback or empty operational context (0x0000). */
  readonly NONE: 0x0000;
  /** Response indicating that the connection to the server was successfully established (0x0002). */
  readonly CONNECTED: 0x0002;
  /** Response containing a localized partial dataset package resulting from an active query (0x0007). */
  readonly QUERY_DATA: 0x0007;
  /** Latency heartbeat response validating remote engine availability (0x0010). */
  readonly PONG: 0x0010;
  /** Confirms new structural schema compilation completed safely on disk (0x0201). */
  readonly CREATE_SCHEMA_SUCCESS: 0x0201;
  /** Confirms schema transition to the public deployment workspace succeeded (0x0202). */
  readonly PUBLISH_SCHEMA_SUCCESS: 0x0202;
  /** Signals total result execution completion for the current transaction pipeline (0x0608). */
  readonly QUERY_COMPLETE: 0x0608;

  // =========================================================================
  // Client-Side Violations & Request Exceptions (0x0400 - 0x0422)
  // =========================================================================
  /** Confirms connection termination or session closure workflow has processed (0x0400). */
  readonly DISCONNECT: 0x0400;
  /** Security exception indicating insufficient permissions for the targeted payload (0x0400). */
  readonly NO_ACCESS: 0x0400;
  /** Identity exception tracking cryptographic signature or access lifecycle timeouts (0x0401). */
  readonly TOKEN_EXPIRED: 0x0401;
  /** Syntax or grammatical compilation error inside the submitted query (0x0420). */
  readonly QUERY_PARSE_ERROR: 0x0420;
  /** Indicates targeted database schema reference is malformed or non-existent (0x0421). */
  readonly INVALID_SCHEMA: 0x0421;
  /** Structural column error reflecting invalid datatypes or missing properties (0x0422). */
  readonly FIELD_ERROR: 0x0422;

  // =========================================================================
  // Infrastructure & Core Engine Fault States (0x0500 - 0x0522)
  // =========================================================================
  /** Network exception fired when handshake or socket streaming pipeline fails (0x0500). */
  readonly CONNECT_ERROR: 0x0500;
  /** Runtime exception tracked when session channel termination fails (0x0501). */
  readonly DISCONNECT_ERROR: 0x0501;
  /** Security exception for rejected keys, secret tokens, or handshake signatures (0x0502). */
  readonly CLIENT_AUTH_ERROR: 0x0502;
  /** Operational database engine fault triggered during runtime transaction execution (0x0520). */
  readonly QUERY_ERROR: 0x0520;
  /** Structural compilation failure tracking schema creation operations (0x0521). */
  readonly CREATE_SCHEMA_ERROR: 0x0521;
  /** Deployment workflow error preventing schema workspace transitions (0x0522). */
  readonly PUBLISH_SCHEMA_ERROR: 0x0522;
};

/**
 * Frozen protocol operation status dictionary mapping remote responses to explicit hexadecimal words.
 */
declare const ResponseType: ResponseTypeMap;

/**
 * Type utility representing any valid ZTeraDB ResponseType code value.
 */
export type ResponseType = ResponseTypeMap[keyof ResponseTypeMap];

export default ResponseType;