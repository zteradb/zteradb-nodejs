/**
 * @file select-user-by-email.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - User Query Retrieval Service
 * --------------------------------------------------------------------------
 * 
 * @description
 * Validates running cluster bounds, instantiates an abstract 
 * connection pipeline, constructs a targeted selection criteria query, and 
 * efficiently streams user records via an asynchronous data cursor.
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
 * Isolates and evaluates targeted collection constraints dynamically.
 * @param {ZTeraDBConnection} connection - Active cluster pipe abstraction.
 * @param {string} targetEmail - Query evaluation target criteria parameter.
 * @returns {Promise<void>} Resolves when the async result stream has finished processing.
 */
async function fetchUserRecordsByEmail(connection, targetEmail) {
  const userQuery = new ZTeraDBQuery("user")
    .select()
    .filter({ email: targetEmail });

  const userResult = await connection.run(userQuery);

  console.log(`[INFO] Streaming matching dataset metrics for parameter: [${targetEmail}]`);

  // Asynchronously iterate across streaming transaction chunks safely
  for await (const userData of userResult) {
    console.log("[RECORD] ->", userData);
  }
}

/**
 * Pipeline Orchestration Interface. Handles runtime context lifecycle operations 
 * and structural resource cleanup bounds.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  const targetEmail = "john.doe@example.com";
  
  let connection = null;

  try {
    validateNetworkConfig(host, port);

    connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);
    console.log("[INFO] Synchronization layer initialized. Querying index fields...");

    await fetchUserRecordsByEmail(connection, targetEmail);
    console.log("[SUCCESS] Stream iterator finished processing records context successfully.");

  } catch (error) {
    console.error(`[FATAL] Query transaction loop crashed inside selector runner:`, error.message);
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

// Initialize Query Runner Process
main();