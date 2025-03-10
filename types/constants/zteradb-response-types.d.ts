export = ResponseType;
/**
 * *
 */
type ResponseType = number;
/**
 * @file response-type.js
 *
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 *
 * Licensed under the ZTeraDB License. See LICENSE file for details.
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
 * @readonly
 * @enum {number}
 * @property {number} CONNECTED - Response indicating that the connection to the server was successfully established.
 * @property {number} CONNECT_ERROR - Response indicating that there was an error establishing the connection.
 * @property {number} DISCONNECTED - Response indicating that the connection has been terminated or closed.
 * @property {number} DISCONNECT_ERROR - Response indicating that there was an error while attempting to disconnect.
 * @property {number} CLIENT_AUTH_ERROR - Response indicating that authentication of the client has failed.
 * @property {number} QUERY_DATA - Response containing the result data for a database query.
 * @property {number} QUERY_COMPLETE - Response indicating that a query has been completed successfully.
 * @property {number} QUERY_ERROR - Response indicating that there was an error during query execution.
 * @property {number} PONG - Response indicating that a "ping" request has been successfully received (usually for heartbeat or status check).
 * @property {number} PARSE_QUERY_ERROR - Response indicating that there was an error parsing the query.
 * @property {number} NO_ACCESS - Response indicating that the client does not have permission to perform the requested action.
 * @property {number} TOKEN_EXPIRED - Response indicating that the authentication token has expired.
 * @property {number} INVALID_SCHEMA - Response indicating that the requested schema is invalid or does not exist.
 * @property {number} FIELD_ERROR - Response indicating that there was an error related to fields (e.g., missing or invalid fields).
 * @property {number} CREATE_SCHEMA_SUCCESS - Response indicating that schema creation was successful.
 * @property {number} CREATE_SCHEMA_ERROR - Response indicating that there was an error creating the schema.
 * @property {number} PUBLISH_SCHEMA_SUCCESS - Response indicating that schema publication was successful.
 * @property {number} PUBLISH_SCHEMA_ERROR - Response indicating that there was an error publishing the schema.
 * @property {null} NONE - A placeholder for no specific response type.
 *
 * @example
 *   const isConnected = ServerequestType === ResponseType.CONNECTED;  // To verify client is connected or not
 *          where ServerequestType is response type from the server.
 *
 * @object FilterTypes
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */
declare const ResponseType: Readonly<{
    CONNECTED: 2;
    CONNECT_ERROR: 1280;
    DISCONNECTED: 4;
    DISCONNECT_ERROR: 5;
    CLIENT_AUTH_ERROR: 6;
    QUERY_DATA: 7;
    QUERY_COMPLETE: 1544;
    QUERY_ERROR: 9;
    PONG: 16;
    PARSE_QUERY_ERROR: 256;
    NO_ACCESS: 17;
    TOKEN_EXPIRED: 1024;
    INVALID_SCHEMA: 1025;
    FIELD_ERROR: 1026;
    CREATE_SCHEMA_SUCCESS: 513;
    CREATE_SCHEMA_ERROR: 1281;
    PUBLISH_SCHEMA_SUCCESS: 514;
    PUBLISH_SCHEMA_ERROR: 1282;
    NONE: any;
}>;
