/**
 * ZTeraDB Client - Module Export File
 * 
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 * 
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 * 
 * @description This module exports the necessary classes for interacting with the ZTeraDB database:
 * - ZTeraDBConnect: Handles database connections.
 * - ZTeraDBQuery: Provides methods for building and executing database queries.
 * - ZTEQUAL(field, value): Generates a condition where field equals the provided value.
 * - ZTMUL(values): The values to be multiplied in the filter.
 * - ZTSUB(values): The values to be substracted in the filter.
 * - ZTADD(values): The values to be added in the filter.
 * - ZTDIV(dividend, divisor): The values to be devided in the filter.
 * - ZTMOD(dividend, divisor): The values to be modulo in the filter.
 * - ZTGT(field, value): Generates a condition where field is greater than the provided value.
 * - ZTLT(field, value): Generates a condition where field is less than the provided value.
 * - ZTGTE(field, value): Generates a condition where field is greater than the provided value.
 * - ZTLTE(field, value): Generates a condition where field is less than the provided value.
 * - ZTIN(field, values): Generates a condition where field is within the list of provided values.
 * - ZTAND(condition1, condition2): Combines two conditions with the logical AND operator.
 * - ZTOR(condition1, condition2): Combines two conditions with the logical OR operator.
 * - ZTCONTAINS(field, value): Generates a condition where the value occurs anywhere in the schema field.
 * - ZTICONTAINS(field, value): Generates a condition where the value case-insensitive occurs anywhere in the schema field.
 * - ZTSTARTSWITH(field, value): Generates a condition where the value starts within the schema field.
 * - ZTISTARTSWITH(field, value): Generates a condition where the value case-insensitive starts within the schema field.
 * - ZTENDSSWITH(field, value): Generates a condition where the value ends within the schema field.
 * - ZTIENDSSWITH(field, value): Generates a condition where the value case-insensitive ends within the schema field.
 * 
 * The goal of this file is to centralize the exports, making it easier to import and use
 * both the connection and query functionalities in other parts of the application.
 * 
 * @module zteradb
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

// Importing the ZTeraDBConnection class from the 'zteradb-connection.js' file
const ZTeraDBConnection = require('./lib/zteradb-connection');

// Importing the ZTeraDBQuery class from the 'query.js' file
const { ZTeraDBQuery, Sort } = require("./lib/zteradb-query");

// Importing the ZTFilterConditions class from the 'filter-conditions-functions.js' file
const {
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
} = require("./lib/zteradb-filter-conditions-functions");

// Export ZTeraDBException to allow user to get the exception type
const ZTeraDBException = require("./helper/zteradb-exception");

module.exports = {
  ZTeraDBConnection, // Export ZTeraDBConnection to allow connection functionality to be used elsewhere
  ZTeraDBQuery,   // Export ZTeraDBQuery to allow querying functionality to be used elsewhere
  Sort,           // Export Sort to allow sort fields
  ZTeraDBException,
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
