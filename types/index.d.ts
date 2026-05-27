/**
 * @file index.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Client Public API Entry Point (Barrel File)
 * --------------------------------------------------------------------------
 *
 * * @description
 * This file acts as the primary public entry point for the ZTeraDB Node.js client.
 * It aggregates and re-exports all essential modules—including the Query Builder,
 * Connection Manager, and Filter Functions—allowing end-users to cleanly import
 * the entire ZTeraDB toolkit from a single root path.
 *
 * * @dependencies
 * - `./query/zteradb-query.js`
 * - `./query/zteradb-connection.js`
 * - `./query/zteradb-filter-conditions-functions.js`
 *
 * @example
 * import { ZTeraDBQuery, ZTeraDBConnect } from 'zteradb';
 *
 * @package     zteradb/client
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

export * from "./query/zteradb-query.js";

export * from "./query/zteradb-connection.js";

export * from "./query/zteradb-filter-conditions-functions.js";
