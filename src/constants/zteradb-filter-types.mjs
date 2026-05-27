/**
 * @file constants/zteradb-filter-types.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB FilterTypes Enum
 * --------------------------------------------------------------------------
 * 
 * @description This file contains the `FilterTypes` frozen object for various filter types
 * used in constructing ZTeraDB queries for advanced filtering operations.
 * 
 * @example
 *   const inFilter = FilterTypes.IN;
 * 
 * @object FilterTypes
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */


/**
 * Enumeration mapping for core relational, mathematical, and logical query operators.
 * This object is frozen to enforce structural integrity across the evaluation lifecycle.
 * * @constant
 * @type {Readonly<Object<string, string>>}
 */
const FilterTypes = Object.freeze({
  // Logical Evaluation Gates
  AND: "&&",                // Logical AND conjunction operator for nested query intersections
  OR: "||",                 // Logical OR disjunction operator for nested query unions

  // Relational Comparison Operators
  EQUAL: "=",               // Strict scalar equality comparison operator
  GT: ">",                  // Strict greater-than relational operator
  GTE: ">=",                // Greater-than-or-equal-to relational boundary operator
  LT: "<",                  // Strict less-than relational operator
  LTE: "<=",                // Less-than-or-equal-to relational boundary operator
  IN: "IN",                 // Explicit set inclusion boundary validation operator

  // Mathematical Functional Operators
  ADD: "+",                 // Arithmetic addition computational token
  SUB: "-",                 // Arithmetic subtraction computational token
  MUL: "*",                 // Arithmetic multiplication computational token
  DIV: "/",                 // Arithmetic division computational token
  MOD: "%",                 // Remainder arithmetic modulo computational token

  // Advanced Pattern / Substring Extraction Filters
  CONTAINS: "%%",           // Case-sensitive wild-card pattern matching substring filter
  ICONTAINS: "i%%",         // Case-insensitive wild-card pattern matching substring filter
  STARTSWITH: "^%%",        // Case-sensitive prefix pattern matching positional filter
  ISTARTSWITH: "^i%%",      // Case-insensitive prefix pattern matching positional filter
  ENDSWITH: "%%$",         // Case-sensitive suffix pattern matching positional filter
  IENDSWITH: "i%%$",        // Case-insensitive suffix pattern matching positional filter
});


// Export structural lookup table via CommonJS specification
export default FilterTypes;
