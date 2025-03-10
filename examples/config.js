/**
 * ZTeraDB Configuration File
 * 
 * This file contains the configuration settings for connecting to the ZTeraDB instance.
 * It retrieves necessary credentials (client key, access key, secret key, database ID)
 * from environment variables. It also configures the connection pool settings and
 * specifies the response data format (JSON).
 * 
 * Environment variables used:
 * - CLIENT_KEY: The key used for client authentication.
 * - ACCESS_KEY: The access key for accessing the database.
 * - SECRET_KEY: The secret key for securing the connection.
 * - DATABASE_ID: The unique identifier for the database.
 * - ZTERADB_ENV: The environment setting (e.g., production or development).
 * - MIN_CONNECTION: The minimum number of database connections in the pool (optional).
 * - MAX_CONNECTION: The maximum number of database connections in the pool (optional).
 * 
 * This configuration is exported for use in other parts of the application.
 * 
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

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
  
  // Defining the response format for the database (JSON in this case)
  responseDataType: "json",
  
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
