/**
 * @file zteradb-config.js
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Client Configuration Instance
 * --------------------------------------------------------------------------
 * 
 * @description
 * Constructs and exports the default configuration object required 
 * to initialize a ZTeraDB client instance, parsing variables 
 * directly from the environment environment context.
 *
 * @dependencies 
 * - ../src/constants/zteradb-response-data-types.mjs
 *
 * @package     zteradb.config
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import ResponseDataTypes from "@zteradb/client/constants/zteradb-response-data-types";

// Configuring the ZTeraDB connection with necessary credentials and options
const ZTeraDBConfig = {
  // Client key for authentication, fetched from environment variables
  clientKey: process.env.CLIENT_KEY,
  
  // Access key for accessing the database, fetched from environment variables
  accessKey: process.env.ACCESS_KEY,
  
  // Secret key for securing the database connection, fetched from environment variables
  secretKey: process.env.SECRET_KEY,
  
  // Database ID for identifying the specific database, fetched from environment variables
  databaseID: process.env.DATABASE_ID,
  
  // Environment setting (e.g., production, development) for the ZTeraDB instance
  env: process.env.ZTERADB_ENV,

  use_tls: (process.env.USE_TLS === "true") ? true: false,
  verify_tls_host: (process.env.VERIFY_TLS_HOST === "true") ? true: false,
  
  // Defining the response format for the database (JSON in this case)
  responseDataType: ResponseDataTypes.JSON,
  
  // Options for configuring the connection pool
  options: {
    connectionPool: {
      // Minimum number of database connections (default is 0 if not set)
      min: process.env.MIN_CONNECTION ? process.env.MIN_CONNECTION : 0,
      
      // Maximum number of database connections (default is 0 if not set)
      max: process.env.MAX_CONNECTION ? process.env.MAX_CONNECTION : 0
    }
  }
};

// Exporting the ZTeraDBConfig object for use in other parts of the application
export default ZTeraDBConfig;
