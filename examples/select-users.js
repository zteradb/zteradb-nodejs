/**
 * @file select-users.js
 * @description This file contains the logic for selecting and retrieving user data from the ZTeraDB database.
 * It uses ZTeraDB client to connect to the database, run a SELECT query on the "user" table, and logs the user data.
 * The database connection details (host and port) are retrieved from environment variables.
 * 
 * @requires ZTeraDBConnection - To create a connection to the ZTeraDB database.
 * @requires ZTeraDBQuery - To build and execute queries on the ZTeraDB database.
 * @requires ZTeraDBConfig - Configuration settings for the ZTeraDB connection.
 * 
 * @dependencies
 * - zteradb: A client library for interacting with ZTeraDB.
 * - environment variables for ZTearDB connection settings (ZTERADB_HOST, ZTERADB_PORT, ZTeraDBConfig).
 * 
 * @example
 * selectusers(); // Fetches and logs all user data from the "user" table.
 * 
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 * 
 * @note Ensure that the ZTeraDBClient and the necessary configuration (ZTeraDBConfig) are properly set up.
 * @note Ensure that the environment variables ZTERADB_HOST and ZTERADB_PORT are properly set before running.
 */

// Import necessary modules from ZTeraDB client
import ZTeraDBConfig from "./config.js";
import { ZTeraDBConnection, ZTeraDBQuery } from "zteradb";

// Get ZTeraDB connection details from environment variables
const ZTeraDBHost = process.env.ZTERADB_HOST;
const ZTeraDBPort = process.env.ZTERADB_PORT;

/**
 * Function to validate if the required environment variables are set
 */
const validateEnvVariables = () => {
  if (!ZTeraDBHost || !ZTeraDBPort) {
    throw new Error("Missing ZTeraDB host or port configuration in environment variables.");
  }
};

/**
 * Function to fetch and log user data from the database
 */
async function fetchAllUsers() {
  // Validate that the required environment variables are present
  validateEnvVariables();

  // Create a ZTeraDB connection
  const connection = new ZTeraDBConnection(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);

  try {
    // Construct the SELECT query for users
    const userQuery = new ZTeraDBQuery("user")
      .select(); // SELECT query to fetch user data

    // Execute the query and get the result
    const userResult = await connection.run(userQuery);

    // Iterate through the result and log each user's data
    for await (const userData of userResult) {
      console.log(userData); // Example output: { email: 'john.doe@example.com', password: 'hashed_password', status: true, id: 1 }
    }
  } catch (error) {
    // Log and rethrow the error for further handling
    console.error("Error during user retrieval:", error);
    throw error;
  } finally {
    // Ensure the connection is closed after the operation
    connection.close();
  }
}

// Call the function to fetch users
fetchAllUsers();
