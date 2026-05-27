/**
 * @file index.mjs (or main export file)
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Module Export File
 * --------------------------------------------------------------------------
 *
 * * @description
 * This file centralizes and exports the necessary classes, configurations, 
 * and filter functions used by the ZTeraDB client module.
 * - ZTeraDBConnection: Handles database connections.
 * - ZTeraDBQuery: Provides methods for building and executing database queries.
 * - ZTeraDBConfig: Standard configuration class for the SDK environment.
 * - ResponseDataTypes: Constant dictionary mapping response payloads.
 * - ENVS: Environment profiles configuration helper.
 * - Sort: Utility definitions for ordering record fields.
 * - ZTEQUAL: Generates a condition where field equals the provided value.
 * - ZTADD, ZTSUB, ZTMUL, ZTDIV, ZTMOD: Filter functions for math operations.
 * - ZTGT, ZTGTE, ZTLT, ZTLTE: Filter functions for value comparison boundaries.
 * - ZTIN, ZTAND, ZTOR: Logic evaluation and set filter functions.
 * - ZTCONTAINS, ZTICONTAINS: Substring match filters (Case-sensitive / Case-insensitive).
 * - ZTSTARTSWITH, ZTISTARTSWITH: Prefix match filters (Case-sensitive / Case-insensitive).
 * - ZTENDSWITH, ZTIENDSWITH: Suffix match filters (Case-sensitive / Case-insensitive).
 *
 * @dependencies 
 * - @zteradb/client/connection/zteradb-connection
 * - @zteradb/client/query
 * - @zteradb/client/constants/zteradb-response-data-types
 * - @zteradb/client/config/envs
 * - @zteradb/client/config/zteradb-config
 * - @zteradb/client/query/zteradb-filter-conditions-functions
 * - @zteradb/client/helper/zteradb-exception
 *
 * @package     zteradb.client
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

// Importing the ZTeraDBConnect class from the 'zteradb-connection.js' file
import ZTeraDBConnection from "@zteradb/client/connection/zteradb-connection";

// Importing the ZTeraDBQuery class from the 'query.js' file
import ZTeraDBQuery, { Sort } from "@zteradb/client/query";
import ResponseDataTypes from "@zteradb/client/constants/zteradb-response-data-types";
import ENVS from "@zteradb/client/config/envs";
import ZTeraDBConfig from "@zteradb/client/config/zteradb-config";

// Importing the ZTFilterConditions class from the 'filter-conditions-functions.js' file
import {
  ZTEQUAL,
  ZTADD,
  ZTSUB,
  ZTMUL,
  ZTDIV,
  ZTMOD,
  ZTIN,
  ZTOR,
  ZTAND,
  ZTGT,
  ZTGTE,
  ZTLT,
  ZTLTE,
  ZTCONTAINS,
  ZTICONTAINS,
  ZTSTARTSWITH,
  ZTISTARTSWITH,
  ZTENDSWITH,
  ZTIENDSWITH,
} from "@zteradb/client/query/zteradb-filter-conditions-functions";

// Export ZTeraDBException to allow user to get the exception type
export * as ZTeraDBException from "@zteradb/client/helper/zteradb-exception";

export {
  ZTeraDBConnection, // Export ZTeraDBConnection to allow connection functionality to be used elsewhere
  ZTeraDBQuery,   // Export ZTeraDBQuery to allow querying functionality to be used elsewhere
  ZTeraDBConfig,  // Export ZTeraDBConfig to allow the developer to set it from elsewhere
  ResponseDataTypes,  // Export ResponseDataTypes to allow the developerto set it from elsewhere
  ENVS, // Export Envs to allow the developerto set it from elsewhere
  Sort,           // Export Sort to allow sort fields
  ZTEQUAL,
  ZTADD,
  ZTSUB,
  ZTMUL,
  ZTDIV,
  ZTMOD,
  ZTIN,
  ZTOR,
  ZTAND,
  ZTGT,
  ZTGTE,
  ZTLT,
  ZTLTE,
  ZTCONTAINS,
  ZTICONTAINS,
  ZTSTARTSWITH,
  ZTISTARTSWITH,
  ZTENDSWITH,
  ZTIENDSWITH,
}
