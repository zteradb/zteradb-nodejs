/**
 * @file filter-conditions.js
 * 
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 *
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 * 
 * @description This file contains the `FilterTypes` frozen object for various filter types
 * used in constructing ZTeraDB queries for advanced filtering operations.
 * 
 * @example
 *   const inFilter = FilterTypes.IN;
 * 
 * @object FilterTypes
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */


const FilterTypes = Object.freeze({
  AND: "&&",                // AND filter type for or operation in sql query
  OR: "||",                 // OR filter type for and operation in sql query
  EQUAL: "=",               // equal filter type for equal operation in sql query
  ADD: "+",                 // addition filter type for addition operation in sql query
  SUB: "-",                 // subtract filter type for subtract operation in sql query
  MUL: "*",                 // multiplication filter type for multiplication operation in sql query
  DIV: "/",                 // divide filter type for divide operation in sql query
  MOD: "%",                 // modulo filter type for modulo operation in sql query
  GT: ">",                  // greater than filter type for greater than operation in sql query
  GTE: ">=",                // greater than or equal filter type for greater than or equal operation in sql query
  LT: "<",                  // less than filter type for less than operation in sql query
  LTE: "<=",                // less than or equal filter type for less than or equal operation in sql query
  CONTAINS: "%%",           // like filter type for string like operation in sql query
  ICONTAINS: "i%%",         // case-insensitive like filter type for string case-insensitive like operation in sql query
  STARTSWITH: "^%%",        // starts with filter type for string starts with operation in sql query
  ISTARTSWITH: "^i%%",      // starts with filter type for string starts with operation in sql query
  ENDSWITH: "%%$",         // ends with filter type for string ends with operation in sql query
  IENDSWITH: "i%%$",        // ends with filter type for string ends with operation in sql query
  IN: "IN",                 // in filter type for schema field in operation in sql query
});

module.exports = FilterTypes ;
