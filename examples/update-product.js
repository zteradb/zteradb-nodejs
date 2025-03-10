/**
 * @file delete-order.js
 * @description This script deletes an existing order from the ZTeraDB database.
 * The process consists of deleting the order from the `order` table based on a filter condition for a specific product ID.
 *
 * @dependencies
 * - zteradb: A client library for interacting with ZTeraDB.
 * - environment variables for ZTeraDB connection settings (ZTERADB_HOST, ZTERADB_PORT, ZTeraDBConfig).
 *
 * @async
 * @function deleteOrder
 * @returns {Promise<void>} 
 *   Executes the deletion process for the order in the database. Logs success or failure messages.
 *
 * @example
 * // Call the function to delete an order
 * deleteOrder();
 * 
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 *
 * @note Ensure that the ZTeraDBClient and the necessary configuration (ZTeraDBConfig) are properly set up.
 * @note Ensure that the ZTERADB_HOST and ZTERADB_PORT are set in the environment.
 */

// Import config
import ZTeraDBConfig from "./config.js";

// Import ZTeraDBConnection, ZTeraDBQuery from ZTeraDB client
import { ZTeraDBConnection, ZTeraDBQuery } from "zteradb";

// Get ZTERADB_HOST and ZTERADB_PORT from environment
const { ZTERADB_HOST: ZTeraDBHost, ZTERADB_PORT: ZTeraDBPort } = process.env;

// Function to validate environment variables
function validateEnvVars() {
  if (!ZTeraDBHost || !ZTeraDBPort) {
    throw new Error("Missing ZTeraDB host or port configuration in environment variables.");
  }
}

// Function to construct the product query
function updateProductQuery() {
  return new ZTeraDBQuery("product")
    .update()  // Update query
    .fields({ name: "Wireless Gaming Keyboard" })  // Set product name
    .filter({ name: "Gaming Keyboard" });  // Filter for existing product
}

// Function to handle the insertion
async function updateProduct() {
  try {
    // Validate environment variables
    validateEnvVars();

    // Create ZTeraDB connection
    const connection = new ZTeraDBConnection(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);

    try {
      // Construct the query
      const productQuery = updateProductQuery();

      // Run the query and handle the result
      const result = await connection.run(productQuery);

      if (result["is_updated"]) {
        console.log("Product has been updated successfully.");
      } else {
        console.log("Product update failed.");
      }
    } catch (error) {
      console.error("Error during query execution:", error);
      throw error;
    } finally {
      // Ensure the connection is closed
      connection.close();
    }
  } catch (error) {
    console.error("Error during user profile insertion:", error);
    throw error;  // Rethrow the error
  }
}

// Call the updateProduct function
updateProduct();
