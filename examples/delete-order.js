/**
 * @file delete-order.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Order Deletion Runner
 * --------------------------------------------------------------------------
 * 
 * @description
 * Validates environment initialization context, instantiates a 
 * secure ZTeraDB connection instance, builds a document removal 
 * query, and safely disposes of the connection pool lifecycle.
 *
 * @dependencies 
 * - ./config.js
 * - zteradb
 *
 * @package     zteradb.examples
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

// Import config via CommonJS
const ZTeraDBConfig = require("./config.js");

// Import ZTeraDBConnection, ZTeraDBQuery from ZTeraDB client via CommonJS destructuring
const { ZTeraDBConnection, ZTeraDBQuery } = require("zteradb");

// Get ZTERADB_HOST and ZTERADB_PORT from environment
const { ZTERADB_HOST: ZTeraDBHost, ZTERADB_PORT: ZTeraDBPort } = process.env;

/**
 * Validates environmental network variables.
 * @param {string} host - Target database server address.
 * @param {string|number} port - Network connection port identifier.
 * @throws {TypeError} If network connection parameters are missing or invalid.
 */
function validateNetworkConfig(host, port) {
  if (!host || !port) {
    throw new TypeError(
      "Deployment Fault: ZTERADB_HOST or ZTERADB_PORT environment configuration is missing."
    );
  }
}

/**
 * Constructs an absolute structural query framework to delete a target item context.
 * @param {string} productId - Unique identifier of the product document to clear.
 * @returns {ZTeraDBQuery} Ready-to-evaluate database query builder payload.
 */
function createDeleteOrderQuery(productId) {
  return new ZTeraDBQuery("order")
    .delete()
    .filter({ product: productId });
}

/**
 * Evaluates operation wire-protocol payloads and signals explicit workflow feedback.
 * @param {Object} result - Execution metrics returned from the database cluster.
 */
function handleDeleteResult(result) {
  if (result?.is_deleted) {
    console.log(`[SUCCESS] Order tracking criteria executed successfully.`);
  } else {
    console.warn(`[WARNING] Database acknowledge payload returned failure state:`, result);
  }
}

/**
 * Pipeline Orchestrator. Consumes infrastructure bounds, provisions SDK resources,
 * monitors operations loops, and protects connection lifecycles defensively.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  const targetProduct = "4UARJ2B0KOABVQVRSUDMLR4M89";
  
  let connection = null;

  try {
    // 1. Structural Validation
    validateNetworkConfig(host, port);

    // 2. Resource Allocation
    connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);
    const deleteQuery = createDeleteOrderQuery(targetProduct);

    // 3. Execution Processing
    console.log(`[INFO] Attempting to purge order entries matching record: ${targetProduct}...`);
    const result = await connection.run(deleteQuery);
    
    // 4. Output Processing
    handleDeleteResult(result);

  } catch (error) {
    console.error(`[FATAL] Pipeline broken. Error executing order cleanup script:`, error.message);
    process.exitCode = 1;
  } finally {
    // 5. Explicit Resource Teardown
    if (connection && typeof connection.close === "function") {
      try {
        connection.close();
        console.log("[INFO] Connection pipeline closed safely.");
      } catch (closeError) {
        console.error("[ERROR] Failed to release connection sockets gracefully:", closeError.message);
      }
    }
  }
}

// Fire runner execution lifecycle
main();