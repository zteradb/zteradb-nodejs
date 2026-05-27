/**
 * @file constants/zteradb-request-types.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB RequestType Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Protocol Frame Opcode Enumeration Definitions for ZTeraDB Network Communications.
 * This declaration file maps the low-level byte command codes (`Opcodes`) embedded within
 * the serialized TCP request packets to ensure compile-time type safety.
 *
 * @example
 * import RequestType from './constants/zteradb-request-types.js';
 * const connectHeader: RequestType = RequestType.CONNECT; // Evaluates to: 0x0001
 *
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */
/**
 * Protocol operation command dictionary mapping transaction tasks to explicit hexadecimal words.
 */
export const enum RequestType {
  // =========================================================================
  // Core Infrastructure & Connection Lifecycle (0x0001 - 0x000F)
  // =========================================================================
  /** Explicit null placeholder indicating a fallback or empty operational context (0x0000). */
  NONE = 0x0000,

  /** Initiates client validation, handshakes, and session establishments (0x0001). */
  CONNECT = 0x0001,

  /** Safely tears down channel pipelines and frees remote socket workers (0x0002). */
  DISCONNECT = 0x0002,

  /** Dispatches database AST queries or modification commands to the engine (0x0005). */
  QUERY = 0x0005,

  /** Heartbeat verify probe verifying line availability and computing network latency (0x0007). */
  PING = 0x0007,

  // =========================================================================
  // DDL / Schema Structural Operations (0x0221 - 0x0226)
  // =========================================================================
  /** Commands compilation of new structural schemas within active storage zones (0x0221). */
  CREATE_SCHEMA = 0x0221,

  /** Declares local schema architectures public or production-ready (0x0222). */
  PUBLISH_SCHEMA = 0x0222,

  /** Broad-scope orchestration command targeting core schema entities (0x0223). */
  SCHEMA = 0x0223,

  /** Manages individual columns, primitive datatypes, and schema field specs (0x0224). */
  SCHEMA_FIELDS = 0x0224,

  /** Processes relation linkages, foreign key bounds, and entity associations (0x0225). */
  SCHEMA_RELATED = 0x0225,

  /** Enforces identity permission bindings directly against individual schemas (0x0226). */
  SCHEMA_ACCESS = 0x0226,

  // =========================================================================
  // Storage Engines & Workspace Contexts (0x0227 - 0x022F)
  // =========================================================================
  /** Global management action pointing to root cluster database nodes (0x0227). */
  DATABASE = 0x0227,

  /** Modifies session-level transactional targeting for running connection paths (0x0228). */
  ACTIVE_DATABASE = 0x0228,

  /** Grants or limits security scopes targeting comprehensive database namespaces (0x0229). */
  DATABASE_ACCESS = 0x0229,

  // =========================================================================
  // Identity Management & Access Control (0x0230 - 0x0232)
  // =========================================================================
  /** Triggers processing operations mapping to corporate identities (0x0230). */
  ENTERPRISE_USER = 0x0230,

  /** Configures or assigns role-based permission profiles (RBAC) (0x0231). */
  ROLE = 0x0231,

  /** Access Control List (ACL) runtime check authorization handler (0x0232). */
  ACCESS_CONTROL = 0x0232,

  // =========================================================================
  // Server Provisioning & Topology Matrix (0x0233 - 0x0236)
  // =========================================================================
  /** Configuration operation targeting standard ZTeraDB engines (0x0233). */
  ZTERADB_INSTANCE = 0x0233,

  /** Targets isolated high-availability cluster enterprise engines (0x0234). */
  ZTERADB_ENTERPRISE_INSTANCE = 0x0234,

  /** Coordinates network groupings of multi-region deployment structures (0x0235). */
  ZTERADB_ENTERPRISE_INSTANCE_GROUP = 0x0235,

  /** Modifies targeted individual node properties in an enterprise setup (0x0236). */
  ENTERPRISE_INSTANCE = 0x0236,

  // =========================================================================
  // Security Credentials & Profiles (0x0237 - 0x0243)
  // =========================================================================
  /** Authorizes alterations of client secrets, api tokens, or keys (0x0237). */
  CREDENTIALS = 0x0237,

  /** Modifies personal account data matrices or custom application configurations (0x0238). */
  USER_PROFILE = 0x0238,

  /** Secondary multi-factor challenge authentication verification gateway (0x0243). */
  MFA = 0x0243,

  // =========================================================================
  // Auditing, Monitoring & Metrics (0x0244 - 0x024F)
  // =========================================================================
  /** Streams or appends immutable historical platform operational transactions (0x0244). */
  AUDITLOG = 0x0244,

  /** Pulls engine processing metrics, telemetry, or system performance counters (0x0245). */
  KPI = 0x0245,
}
export default RequestType;