/**
 * @file constants/zteradb-request-types.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB RequestType Enum
 * --------------------------------------------------------------------------
 * 
 * @description Protocol Frame Opcode Enumeration for ZTeraDB Network Communications.
 * This module defines the low-level byte command codes (`Opcodes`) embedded within 
 * the serialized TCP request packets. These headers dictate downstream multiplexing, 
 * routing, payload parsing, and service handling rules on remote cluster nodes.
 * @example
 * const RequestType = require('./request-types.js');
 * * const connectHeader = RequestType.CONNECT; // Evaluates to: 0x0001
 * const multiFactorAuth = RequestType.MFA;     // Evaluates to: 0x0243
 * 
 * @object RequestType
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

/**
 * @typedef {Object} RequestTypeMap
 * @property {number} NONE - Explicit null placeholder indicating a fallback or empty operational context (0x0000).
 * @property {number} CONNECT - Initiates client validation, handshakes, and session establishments (0x0001).
 * @property {number} DISCONNECT - Safely tears down channel pipelines and frees remote socket workers (0x0002).
 * @property {number} QUERY - Dispatches database AST queries or modification commands to the engine (0x0005).
 * @property {number} PING - Heartbeat verify probe verifying line availability and computing network latency (0x0007).
 * @property {number} CREATE_SCHEMA - Commands compilation of new structural schemas within active storage zones (0x0221).
 * @property {number} PUBLISH_SCHEMA - Declares local schema architectures public or production-ready (0x0222).
 * @property {number} SCHEMA - Broad-scope orchestration command targeting core schema entities (0x0223).
 * @property {number} SCHEMA_FIELDS - Manages individual columns, primitive datatypes, and schema field specs (0x0224).
 * @property {number} SCHEMA_RELATED - Processes relation linkages, foreign key bounds, and entity associations (0x0225).
 * @property {number} SCHEMA_ACCESS - Enforces identity permission bindings directly against individual schemas (0x0226).
 * @property {number} DATABASE - Global management action pointing to root cluster database nodes (0x0227).
 * @property {number} ACTIVE_DATABASE - Modifies session-level transactional targeting for running connection paths (0x0228).
 * @property {number} DATABASE_ACCESS - Grants or limits security scopes targeting comprehensive database namespaces (0x0229).
 * @property {number} ENTERPRISE_USER - Triggers processing operations mapping to corporate identities (0x0230).
 * @property {number} ROLE - Configures or assigns role-based permission profiles (RBAC) (0x0231).
 * @property {number} ACCESS_CONTROL - Access Control List (ACL) runtime check authorization handler (0x0232).
 * @property {number} ZTERADB_INSTANCE - Configuration operation targeting standard ZTeraDB engines (0x0233).
 * @property {number} ZTERADB_ENTERPRISE_INSTANCE - Targets isolated high-availability cluster enterprise engines (0x0234).
 * @property {number} ZTERADB_ENTERPRISE_INSTANCE_GROUP - Coordinates network groupings of multi-region deployment structures (0x0235).
 * @property {number} ENTERPRISE_INSTANCE - Modifies targeted individual node properties in an enterprise setup (0x0236).
 * @property {number} CREDENTIALS - Authorizes alterations of client secrets, api tokens, or keys (0x0237).
 * @property {number} USER_PROFILE - Modifies personal account data matrices or custom application configurations (0x0238).
 * @property {number} MFA - Secondary multi-factor challenge authentication verification gateway (0x0243).
 * @property {number} AUDITLOG - Streams or appends immutable historical platform operational transactions (0x0244).
 * @property {number} KPI - Pulls engine processing metrics, telemetry, or system performance counters (0x0245).
 */

/**
 * Frozen protocol operation command dictionary mapping transaction tasks to explicit hexadecimal words.
 * * @constant
 * @enum {number}
 * @type {Readonly<RequestTypeMap>}
 */
const RequestType = Object.freeze({
  // =========================================================================
  // Core Infrastructure & Connection Lifecycle (0x0001 - 0x000F)
  // =========================================================================
  NONE: 0x0000,                             
  CONNECT: 0x0001,                          
  DISCONNECT: 0x0002,                       
  QUERY: 0x0005,                            
  PING: 0x0007,                             

  // =========================================================================
  // DDL / Schema Structural Operations (0x0221 - 0x0226)
  // =========================================================================
  CREATE_SCHEMA: 0x0221,                    
  PUBLISH_SCHEMA: 0x0222,                   
  SCHEMA: 0x0223,                           
  SCHEMA_FIELDS: 0x0224,                    
  SCHEMA_RELATED: 0x0225,                   
  SCHEMA_ACCESS: 0x0226,                    

  // =========================================================================
  // Storage Engines & Workspace Contexts (0x0227 - 0x022F)
  // =========================================================================
  DATABASE: 0x0227,                         
  ACTIVE_DATABASE: 0x0228,                  
  DATABASE_ACCESS: 0x0229,                  

  // =========================================================================
  // Identity Management & Access Control (0x0230 - 0x0232)
  // =========================================================================
  ENTERPRISE_USER: 0x0230,                  
  ROLE: 0x0231,                             
  ACCESS_CONTROL: 0x0232,                   

  // =========================================================================
  // Server Provisioning & Topology Matrix (0x0233 - 0x0236)
  // =========================================================================
  ZTERADB_INSTANCE: 0x0233,                 
  ZTERADB_ENTERPRISE_INSTANCE: 0x0234,      
  ZTERADB_ENTERPRISE_INSTANCE_GROUP: 0x0235,
  ENTERPRISE_INSTANCE: 0x0236,              

  // =========================================================================
  // Security Credentials & Profiles (0x0237 - 0x0243)
  // =========================================================================
  CREDENTIALS: 0x0237,                      
  USER_PROFILE: 0x0238,                     
  MFA: 0x0243,                              

  // =========================================================================
  // Auditing, Monitoring & Metrics (0x0244 - 0x024F)
  // =========================================================================
  AUDITLOG: 0x0244,                         
  KPI: 0x0245,                              
});

// Export structural command opcode dictionary via CommonJS specification
export default RequestType;
