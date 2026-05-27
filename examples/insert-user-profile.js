/**
 * @file insert-user-profile.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Relational Profile Ingestion Task
 * --------------------------------------------------------------------------
 * 
 * @description
 * Validates environment settings, creates an isolated database connection, 
 * persists a core user identity record, and uses its returned sequence identifier 
 * to securely map and link a secondary transactional metadata profile.
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

// --- Operational Seed Data Configuration ---
const MOCK_USER = {
  email: "john.doe@example.com",
  password: "9b4d99d461723232aff72be0351f114b",
  status: true
};

const MOCK_PROFILE = {
  address: "a-123, xyz lane, my city, IN",
  profile_image: "/user/xyz.jpg"
};

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
 * Coordinates sequential, relational table identity mapping updates securely.
 * @param {ZTeraDBConnection} connection - Active transaction node cluster link.
 * @param {Object} userData - Identity core object field map parameters.
 * @param {Object} profileData - Extended client metadata details context.
 * @returns {Promise<{userId: number|string, userProfileId: number|string}>} Generated database keys map.
 */
async function processUserProfileIngestion(connection, userData, profileData) {
  // Step 1: Construct and submit identity account details
  const userQuery = new ZTeraDBQuery("user")
    .insert()
    .fields(userData);

  const userResult = await connection.run(userQuery);
  const userId = userResult?.last_insert_id;

  if (!userId) {
    throw new Error("Pipeline Ingestion Fault: Failed to obtain a valid 'last_insert_id' for user schema initialization.");
  }
  console.log(`[INFO] Identity record provisioned successfully. Assigned User ID: ${userId}`);

  // Step 2: Inject primary identity key downstream as a foreign pointer relation
  const mappedProfileFields = {
    ...profileData,
    user: userId
  };

  const profileQuery = new ZTeraDBQuery("user_profile")
    .insert()
    .fields(mappedProfileFields);

  const profileResult = await connection.run(profileQuery);
  const userProfileId = profileResult?.last_insert_id;

  if (!userProfileId) {
    throw new Error(`Pipeline Ingestion Fault: Profile generation aborted for associated User ID: ${userId}`);
  }

  return { userId, userProfileId };
}

/**
 * Pipeline Orchestration Interface. Handles runtime context lifecycle operations 
 * and structural exception capturing layers.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  
  let connection = null;

  try {
    validateNetworkConfig(host, port);

    connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);
    console.log("[INFO] Synchronization layer initialized. Executing relational sequence...");

    const ingestionSummary = await processUserProfileIngestion(connection, MOCK_USER, MOCK_PROFILE);
    
    console.log("[SUCCESS] Relational database tree committed successfully.", ingestionSummary);
    return ingestionSummary;

  } catch (error) {
    console.error(`[FATAL] Transaction pipeline collapsed inside profile seeding engine:`, error.message);
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

// Initialize Pipeline Runner Process
main();