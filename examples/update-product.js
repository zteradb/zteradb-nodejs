/**
 * @file update-product.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Single Product Record Mutation Task
 * --------------------------------------------------------------------------
 * 
 * @description
 * Validates target connection environment configurations, opens 
 * an isolated resource pool pipeline, modifies explicit collection indexes 
 * conditionally, and disposes of internal connection states safely.
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

/**
 * Validates infrastructure layer variables.
 * @param {string} host - Database target cluster address.
 * @param {string|number} port - Database operational port assignment.
 * @throws {TypeError} If operational boundaries are missing or invalid.
 */
function validateNetworkConfig(host, port) {
  if (!host || !port) {
    throw new TypeError(
      "Deployment Fault: ZTERADB_HOST or ZTERADB_PORT environment configuration is missing."
    );
  }
}

/**
 * Constructs an absolute mutation schema query structure for a single item collection.
 * @param {Object} filterCriteria - Key-value pair configuration targeting specific records.
 * @param {Object} updateFields - Modified field configurations to apply to matching items.
 * @returns {ZTeraDBQuery} Ready-to-evaluate database update transaction payload.
 */
function createUpdateProductQuery(filterCriteria, updateFields) {
  return new ZTeraDBQuery("product")
    .update()
    .fields(updateFields)
    .filter(filterCriteria);
}

/**
 * Pipeline Orchestration Interface. Handles runtime context lifecycle operations,
 * state validation, database mutations, and structural system cleanups.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  
  const searchCriteria = { name: "Gaming Keyboard" };
  const mutations = { name: "Wireless Gaming Keyboard" };

  let connection = null;

  try {
    validateNetworkConfig(host, port);

    connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);
    console.log("[INFO] Synchronization layer initialized. Compiling modification footprint...");

    const productQuery = createUpdateProductQuery(searchCriteria, mutations);
    const result = await connection.run(productQuery);

    // Evaluate database transaction wire-protocol acknowledgments
    if (result?.is_updated) {
      console.log(`[SUCCESS] Product records matching criteria updated successfully.`);
    } else {
      console.warn("[WARNING] Database transaction completed but zero document rows were altered:", result);
    }

  } catch (error) {
    console.error("[FATAL] Transaction loop broken inside update script engine:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection && typeof connection.close === "function") {
      try {
        connection.close();
        console.log("[INFO] Connection interface resource released safely.");
      } catch (closeError) {
        console.error("[ERROR] Failed to tear down underlying connection context:", closeError.message);
      }
    }
  }
}

// Initialize Product Update Runner Task
main();