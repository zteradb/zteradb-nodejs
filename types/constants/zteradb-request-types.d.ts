export = RequestType;
/**
 * *
 */
type RequestType = number;
/**
 * @file request-type.js
 *
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 *
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 *
 * @description Enumeration of request types used for communication with the ZTeraDB service.
 *
 * This object contains predefined constants that represent different types of requests
 * that can be sent to the ZTeraDB server. Each request type corresponds to a specific
 * action or operation, such as connecting, querying, or managing schemas.
 *
 * These request types are used in the communication protocol to identify the type of
 * request being made, ensuring that the server correctly interprets and processes the request.
 *
 * @readonly
 * @enum {number}
 * @property {number} CONNECT - Request to establish a connection with the server.
 * @property {number} DISCONNECT - Request to disconnect from the server.
 * @property {number} QUERY - Request to execute a query on the database.
 * @property {number} PING - Request to check the server's availability (heartbeat).
 * @property {number} CREATE_SCHEMA - Request to create a new database schema.
 * @property {number} PUBLISH_SCHEMA - Request to publish a database schema.
 * @property {number} DATABASE - Request to interact with a specific database.
 * @property {number} ACTIVE_DATABASE - Request to manage the active database.
 * @property {number} SCHEMA - Request to manage database schema.
 * @property {number} SCHEMA_FIELDS - Request to manage schema fields.
 * @property {number} SCHEMA_RELATED - Request to manage related schema entities.
 * @property {number} SCHEMA_ACCESS - Request to control access to the schema.
 * @property {number} DATABASE_ACCESS - Request to control access to the database.
 * @property {number} ENTERPRISE_USER - Request to manage enterprise users.
 * @property {number} ROLE - Request to manage user roles and permissions.
 * @property {number} ACCESS_CONTROL - Request to control access permissions.
 * @property {number} ZTERADB_INSTANCE - Request to manage a ZTeraDB instance.
 * @property {number} ZTERADB_ENTERPRISE_INSTANCE - Request to manage an enterprise instance.
 * @property {number} ZTERADB_ENTERPRISE_INSTANCE_GROUP - Request to manage enterprise instance groups.
 * @property {number} ENTERPRISE_INSTANCE - Request to manage an individual enterprise instance.
 * @property {number} CREDENTIALS - Request to manage authentication credentials.
 * @property {number} USER_PROFILE - Request to manage user profiles.
 * @property {null} NONE - A placeholder for no specific request type.
 *
 * @example
 *   const requestType = RequestType.CONNECT; // To send connect request to the ZTeraDB server
 *
 * @object FilterTypes
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */
declare const RequestType: Readonly<{
    CONNECT: 1;
    DISCONNECT: 3;
    QUERY: 5;
    PING: 7;
    CREATE_SCHEMA: 8;
    PUBLISH_SCHEMA: 9;
    DATABASE: 16;
    ACTIVE_DATABASE: 17;
    SCHEMA: 18;
    SCHEMA_FIELDS: 19;
    SCHEMA_RELATED: 20;
    SCHEMA_ACCESS: 21;
    DATABASE_ACCESS: 22;
    ENTERPRISE_USER: 23;
    ROLE: 24;
    ACCESS_CONTROL: 25;
    ZTERADB_INSTANCE: 32;
    ZTERADB_ENTERPRISE_INSTANCE: 33;
    ZTERADB_ENTERPRISE_INSTANCE_GROUP: 34;
    ENTERPRISE_INSTANCE: 35;
    CREDENTIALS: 36;
    USER_PROFILE: 37;
    NONE: any;
}>;
