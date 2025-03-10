/**
 * insert_product_order.js
 * 
 * This script is responsible for inserting products and orders into the ZTeraDB database. 
 * It first validates the necessary environment variables, then proceeds to insert a list of 
 * products and their associated orders. The script uses async/await for handling asynchronous 
 * operations and ensures that the database connection is properly managed.
 *
 * @dependencies
 * - zteradb: A client library for interacting with ZTeraDB.
 * - environment variables for ZTearDB connection settings (ZTERADB_HOST, ZTERADB_PORT, ZTeraDBConfig).
 *
 * Environment Variables:
 * - ZTERADB_HOST: The host address for the ZTeraDB database.
 * - ZTERADB_PORT: The port for the ZTeraDB database connection.
 *
 * Example Usage:
 * - Ensure that ZTERADB_HOST and ZTERADB_PORT are set in your environment.
 * - Execute this file using Node.js.
 * 
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 * 
 * @note Ensure that the ZTeraDBClient and the necessary configuration (ZTeraDBConfig) are properly set up.
 * @note Ensure that the environment variables ZTERADB_HOST and ZTERADB_PORT are properly set before running.
 */

// Import config and necessary modules from ZTeraDB client
import ZTeraDBConfig from "./config.js";
import { ZTeraDBConnection, ZTeraDBQuery } from "zteradb";

// Get ZTeraDB connection details from environment variables
const ZTeraDBHost = process.env.ZTERADB_HOST;
const ZTeraDBPort = process.env.ZTERADB_PORT;

// Static user ID, to be passed from an external source (like insert_user_profile.js)
const userId = 1; // Assuming you have run the insert-user-profile.js

// Example product and order data
const products = [
  { name: "Wireless Mouse", description: "Ergonomic wireless mouse with USB receiver", quantity: 120, price: 1999, create_date: "2025-02-01 10:00:00", update_date: "2025-02-01 10:00:00", status: "A" },
  { name: "Bluetooth Headphones", description: "Noise-canceling over-ear Bluetooth headphones", quantity: 50, price: 5999, create_date: "2025-02-02 14:30:00", update_date: "2025-02-02 14:30:00", status: "A" },
  // Other products...
];

const orders = [
  { create_date: "2025-02-21 10:00:00", update_date: "2025-02-21 10:00:00", status: "A" },
  { create_date: "2025-02-21 12:00:00", update_date: "2025-02-21 12:30:00", status: "NA" },
  // Other orders...
];

/**
 * Function to validate if the required environment variables are set
 */
const validateEnvVariables = () => {
  if (!ZTeraDBHost || !ZTeraDBPort) {
    throw new Error("Missing ZTeraDB host or port configuration in environment variables.");
  }
};

/**
 * Function to run a query and return the last inserted ID
 * @param {ZTeraDBConnection} connection - The active database connection
 * @param {ZTeraDBQuery} query - The query object
 * @returns {Promise<number>} - The last inserted ID
 */
const runQuery = async (connection, query) => {
  try {
    const result = await connection.run(query);
    return result.last_insert_id;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

/**
 * Function to insert products into the database
 * @param {ZTeraDBConnection} connection - The active database connection
 * @returns {Promise<number[]>} - The list of inserted product IDs
 */
const insertProducts = async (connection) => {
  return Promise.all(
    products.map((product) => {
      const productQuery = new ZTeraDBQuery("product")
        .insert()
        .fields({ ...product });

      return runQuery(connection, productQuery);
    })
  );
};

/**
 * Function to insert orders into the database for a specific user and product IDs
 * @param {ZTeraDBConnection} connection - The active database connection
 * @param {number[]} productIds - The product IDs to associate with the orders
 * @returns {Promise<number[]>} - The list of inserted order IDs
 */
const insertOrders = async (connection, productIds) => {
  return Promise.all(
    orders.map((order, index) => {
      order.user = userId;
      order.product = productIds[index];

      const orderQuery = new ZTeraDBQuery("order")
        .insert()
        .fields({ ...order });

      return runQuery(connection, orderQuery);
    })
  );
};

/**
 * Main function to insert products and orders into the database
 */
async function insertProductOrder() {
  // Validate the required environment variables
  validateEnvVariables();

  // Create ZTeraDB connection
  const connection = new ZTeraDBConnection(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);

  try {
    // Insert products into the database
    const productIds = await insertProducts(connection);
    console.log("Product IDs inserted:", productIds);

    // Insert orders using the product IDs
    const orderIds = await insertOrders(connection, productIds);
    console.log("Order IDs inserted:", orderIds);
  } catch (error) {
    console.error("Error during product and order insertion:", error);
  } finally {
    // Close the database connection after processing
    connection.close();
  }
}

// Call the main function to insert products and orders
insertProductOrder();
