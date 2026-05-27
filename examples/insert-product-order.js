/**
 * @file insert-product-order.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Bulk Product & Order Ingestion Task
 * --------------------------------------------------------------------------
 * 
 * @description
 * Validates environmental variables, establishes an operational 
 * connection pipeline, provisions mock records concurrently, maps generated 
 * relational foreign keys, and safely releases internal network pools.
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
const SEED_USER_ID = 1;

const MOCK_PRODUCTS = [
  { name: "Wireless Mouse", description: "Ergonomic wireless mouse with USB receiver", quantity: 120, price: 1999, create_date: "2025-02-01 10:00:00", update_date: "2025-02-01 10:00:00", status: "A" },
  { name: "Bluetooth Headphones", description: "Noise-canceling over-ear Bluetooth headphones", quantity: 50, price: 5999, create_date: "2025-02-02 14:30:00", update_date: "2025-02-02 14:30:00", status: "A" }
];

const MOCK_ORDERS = [
  { create_date: "2025-02-21 10:00:00", update_date: "2025-02-21 10:00:00", status: "A" },
  { create_date: "2025-02-21 12:00:00", update_date: "2025-02-21 12:30:00", status: "NA" }
];

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
 * Evaluates a single query construct and yields the database-generated sequence key.
 * @param {ZTeraDBConnection} connection - Active transaction node cluster link.
 * @param {ZTeraDBQuery} query - Formatted payload execution unit.
 * @returns {Promise<number|string>} Remote target last record instance identifier.
 */
async function executeInsertQuery(connection, query) {
  try {
    const result = await connection.run(query);
    return result?.last_insert_id;
  } catch (error) {
    console.error(`[ERROR] Driver structural evaluation failure:`, error.message);
    throw error;
  }
}

/**
 * Executes concurrent entry persistence arrays across data payloads.
 * @param {ZTeraDBConnection} connection - Active cluster pipe abstraction.
 * @param {Array<Object>} dataset - List of records to queue.
 * @returns {Promise<Array<number|string>>} Map array containing newly generated document identifiers.
 */
async function ingestProducts(connection, dataset) {
  return Promise.all(
    dataset.map((product) => {
      const query = new ZTeraDBQuery("product").insert().fields(product);
      return executeInsertQuery(connection, query);
    })
  );
}

/**
 * Pairs active identifiers with core entries and commits mapped dependency records.
 * @param {ZTeraDBConnection} connection - Active cluster pipe abstraction.
 * @param {Array<Object>} dataset - Structural tracking items array.
 * @param {Array<number|string>} productIds - Upstream sequence identifiers.
 * @param {number|string} userId - Reference actor identity parameter.
 * @returns {Promise<Array<number|string>>} Result identity collections mapping.
 */
async function ingestOrders(connection, dataset, productIds, userId) {
  return Promise.all(
    dataset.map((order, index) => {
      const singleOrder = {
        ...order,
        user: userId,
        product: productIds[index] || null
      };

      const query = new ZTeraDBQuery("order").insert().fields(singleOrder);
      return executeInsertQuery(connection, query);
    })
  );
}

/**
 * System Orchestration Entry Point. Coordinates transaction flow control patterns 
 * and handles infrastructure isolation layers safely.
 */
async function main() {
  const host = process.env.ZTERADB_HOST;
  const port = process.env.ZTERADB_PORT;
  
  let connection = null;

  try {
    validateNetworkConfig(host, port);

    connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);
    console.log("[INFO] Synchronization layer initialized. Executing records ingestion...");

    // Phase 1: Products Batch Operations Commitment
    const insertedProductIds = await ingestProducts(connection, MOCK_PRODUCTS);
    console.log(`[SUCCESS] Products provisioned securely. Associated IDs:`, insertedProductIds);

    // Phase 2: Relational Orders Assignment Mapping
    const insertedOrderIds = await ingestOrders(connection, MOCK_ORDERS, insertedProductIds, SEED_USER_ID);
    console.log(`[SUCCESS] Dependent orders bound cleanly. Associated IDs:`, insertedOrderIds);

  } catch (error) {
    console.error(`[FATAL] Transaction loop broke inside seeding task:`, error.message);
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

// Initialize Batch Life Cycle Engine
main();