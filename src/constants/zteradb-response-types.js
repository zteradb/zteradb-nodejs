/**
 * @file constants/response-type.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB ResponseType Enum
 * --------------------------------------------------------------------------
 *
 * @description Enumeration of response types used for communication with the ZTeraDB service.
 * 
 * This object contains predefined constants that represent different types of responses
 * that can be received from the ZTeraDB server. Each response type corresponds to a specific
 * outcome or status of a request, such as whether a connection was successful, an error occurred,
 * or a query was executed successfully.
 * 
 * These response types are used in the communication protocol to interpret the server's response
 * to the client’s requests. The client can handle the response accordingly based on the response type.
 * 
 * @example
 *   const isConnected = ServerequestType === ResponseType.CONNECTED;  // To verify client is connected or not 
 *          where ServerequestType is response type from the server.
 * 
 * @object ResponseType
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

/**
 * @typedef {Object} ResponseTypeMap
 * @property {number} NONE - Explicit null placeholder indicating a fallback or empty operational context (0x0000).
 * @property {number} CONNECTED - Response indicating that the connection to the server was successfully established (0x0002).
 * @property {number} QUERY_DATA - Response containing a localized partial dataset package resulting from an active query (0x0007).
 * @property {number} PONG - Latency heartbeat response validating remote engine availability (0x0010).
 * @property {number} CREATE_SCHEMA_SUCCESS - Confirms new structural schema compilation completed safely on disk (0x0201).
 * @property {number} PUBLISH_SCHEMA_SUCCESS - Confirms schema transition to the public deployment workspace succeeded (0x0202).
 * @property {number} QUERY_COMPLETE - Signals total result execution completion for the current transaction pipeline (0x0608).
 * @property {number} DISCONNECT - Confirms connection termination or session closure workflow has processed (0x0400).
 * @property {number} NO_ACCESS - Security exception indicating insufficient permissions for the targeted payload (0x0400).
 * @property {number} TOKEN_EXPIRED - Identity exception tracking cryptographic signature or access lifecycle timeouts (0x0401).
 * @property {number} QUERY_PARSE_ERROR - Syntax or grammatical compilation error inside the submitted query (0x0420).
 * @property {number} INVALID_SCHEMA - Indicates targeted database schema reference is malformed or non-existent (0x0421).
 * @property {number} FIELD_ERROR - Structural column error reflecting invalid datatypes or missing properties (0x0422).
 * @property {number} CONNECT_ERROR - Network exception fired when handshake or socket streaming pipeline fails (0x0500).
 * @property {number} DISCONNECT_ERROR - Runtime exception tracked when session channel termination fails (0x0501).
 * @property {number} CLIENT_AUTH_ERROR - Security exception for rejected keys, secret tokens, or handshake signatures (0x0502).
 * @property {number} QUERY_ERROR - Operational database engine fault triggered during runtime transaction execution (0x0520).
 * @property {number} CREATE_SCHEMA_ERROR - Structural compilation failure tracking schema creation operations (0x0521).
 * @property {number} PUBLISH_SCHEMA_ERROR - Deployment workflow error preventing schema workspace transitions (0x0522).
 */


/**
 * Frozen protocol operation status dictionary mapping remote responses to explicit hexadecimal words.
 * * Note: Status code assignments map strictly to standardized functional response domains. 
 * Overlapping codes (e.g., 0x0400) reflect unified functional categories managed at the protocol layer.
 * * @constant
 * @enum {number}
 * @type {Readonly<ResponseTypeMap>}
 */
const ResponseType = Object.freeze({
  // =========================================================================
  // Operational Success States (0x0002 - 0x0202)
  // =========================================================================
  NONE: 0x0000,                             
  CONNECTED: 0x0002,                        
  QUERY_DATA: 0x0007,                       
  PONG: 0x0010,                             
  CREATE_SCHEMA_SUCCESS: 0x0201,            
  PUBLISH_SCHEMA_SUCCESS: 0x0202,           
  QUERY_COMPLETE: 0x0608,                   

  // =========================================================================
  // Client-Side Violations & Request Exceptions (0x0400 - 0x0422)
  // =========================================================================
  DISCONNECT: 0x0400,                       // Shared byte signature for session teardown categorization
  NO_ACCESS: 0x0400,                        // Shared byte signature for authorization barrier categorization
  TOKEN_EXPIRED: 0x0401,                    
  QUERY_PARSE_ERROR: 0x0420,                
  INVALID_SCHEMA: 0x0421,                   
  FIELD_ERROR: 0x0422,                      

  // =========================================================================
  // Infrastructure & Core Engine Fault States (0x0500 - 0x0522)
  // =========================================================================
  CONNECT_ERROR: 0x0500,                    
  DISCONNECT_ERROR: 0x0501,                 
  CLIENT_AUTH_ERROR: 0x0502,                
  QUERY_ERROR: 0x0520,                      
  CREATE_SCHEMA_ERROR: 0x0521,              
  PUBLISH_SCHEMA_ERROR: 0x0522,             
});

// Export structural protocol status dictionary via CommonJS specification
module.exports = ResponseType;
