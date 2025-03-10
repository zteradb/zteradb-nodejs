// Import config
import ZTeraDBConfig from "./config.js";

// Import ZTeraDBConnection, ZTeraDBQuery from ZTeraDB client
import { ZTeraDBConnection, ZTeraDBQuery } from "zteradb";

// Get ZTERADB_HOST and ZTERADB_PORT from environment
const { ZTERADB_HOST: ZTeraDBHost, ZTERADB_PORT: ZTeraDBPort } = process.env;

// Validate environment variables
function validateEnvVars() {
  if (!ZTeraDBHost || !ZTeraDBPort) {
    throw new Error("Missing ZTeraDB host or port configuration in environment variables.");
  }
}

// Construct the delete order query
function createDeleteOrderQuery() {
  return new ZTeraDBQuery("order")
    .delete()  // Update query
    .filter({product: "4UARJ2B0KOABVQVRSUDMLR4M89"});  // Filter for existing product
}

// Handle the deletion process
async function deleteOrder() {
  try {
    // Validate environment variables
    validateEnvVars();

    // Create ZTeraDB connection
    const connection = new ZTeraDBConnection(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);

    // Construct the query for deleting the order
    const deleteQuery = createDeleteOrderQuery();

    // Execute the query and handle the result
    const result = await executeQuery(connection, deleteQuery);
    handleDeleteResult(result);
  } catch (error) {
    console.error("Error during order deletion:", error);
    throw error;  // Rethrow the error for further handling if necessary
  }
}

// Execute the query and return the result
async function executeQuery(connection, query) {
  try {
    return await connection.run(query);
  } catch (error) {
    console.error("Error during query execution:", error);
    throw error;
  } finally {
    // Ensure the connection is closed
    connection.close();
  }
}

// Handle the result of the delete operation
function handleDeleteResult(result) {
  if (result["is_deleted"]) {
    console.log("Order has been deleted successfully.");
  } else {
    console.log("Order delete failed.");
  }
}

// Call the deleteOrder function
deleteOrder();
