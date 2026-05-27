/**
 * @file examples/select-users.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Broad User Identity Selector (CommonJS)
 * --------------------------------------------------------------------------
 * 
 * @description
 * Generates context-scoped SDK configurations dynamically, 
 * provisions a secure cluster pool, requests a collection cursor on target 
 * schemas, and continuously streams documents to stdout.
 *
 * @dependencies
 * - @zteradb/client
 * - @zteradb/client/query
 *
 * @package     zteradb.examples
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

const { ZTeraDBConnection, ZTeraDBConfig, ENVS, ResponseDataTypes } = require("@zteradb/client");
const ZTeraDBQuery = require("@zteradb/client/query");

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
 * Pipeline Orchestration Entry Point. Coordinates runtime initialization, 
 * streaming chunk processing, and reliable system cleanup boundaries.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  
  let connection = null;

  try {
    validateNetworkConfig(host, port);

    // Dynamic SDK runtime context creation
    const config = ZTeraDBConfig({
      clientKey: process.env.CLIENT_KEY,
      accessKey: process.env.ACCESS_KEY,
      secretKey: process.env.SECRET_KEY,
      databaseID: process.env.DATABASE_ID,
      env: ENVS.DEV, 
      responseDataType: ResponseDataTypes.JSON, 
      useTls: process.env.USE_TLS === "true",
      verifyTlsHost: process.env.VERIFY_TLS_HOST === "true",
      options: {
        connectionPool: {
          min: 0,
          max: 1
        }
      }
    });

    connection = new ZTeraDBConnection(host, port, config);
    console.log("[INFO] Synchronization layer initialized. Compiling table cursor...");

    const userQuery = new ZTeraDBQuery("user").select();
    const userResult = await connection.run(userQuery);

    console.log("[INFO] Query successfully evaluated. Commencing data stream iteration...");

    // Asynchronously consume rows via chunk collection protocols safely
    for await (const userData of userResult) {
      console.log("[STREAM RECORD] ->", userData);
    }

    console.log("[SUCCESS] Entire user schema sequence has been successfully parsed.");

  } catch (error) {
    console.error("[FATAL] Query transaction loop crashed inside collection scanner:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection && typeof connection.close === "function") {
      try {
        connection.close();
        console.log("[INFO] Connection interface pool released safely.");
      } catch (closeError) {
        console.error("[ERROR] Failed to tear down underlying connection context:", closeError.message);
      }
    }
  }
}

// Fire Task Runner Processing Lifecycle
main();