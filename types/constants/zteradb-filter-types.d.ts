/**
 * @file constants/zteradb-filter-types.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB FilterTypes Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * This file contains the `FilterTypes` enum definitions for various filter types
 * used in constructing ZTeraDB queries for advanced filtering operations.
 *
 * @example
 * import FilterTypes from './constants/zteradb-filter-types.js';
 * const inFilter: FilterTypes = FilterTypes.IN; // Evaluates to: "IN"
 *
 * @package zteradb.constants
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 2.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

/**
 * Enumeration mapping for core relational, mathematical, and logical query operators.
 */
export const enum FilterTypes {
  // =========================================================================
  // Logical Evaluation Gates
  // =========================================================================
  /** Logical AND conjunction operator for nested query intersections */
  AND = "&&",
  /** Logical OR disjunction operator for nested query unions */
  OR = "||",

  // =========================================================================
  // Relational Comparison Operators
  // =========================================================================
  /** Strict scalar equality comparison operator */
  EQUAL = "=",
  /** Strict greater-than relational operator */
  GT = ">",
  /** Greater-than-or-equal-to relational boundary operator */
  GTE = ">=",
  /** Strict less-than relational operator */
  LT = "<",
  /** Less-than-or-equal-to relational boundary operator */
  LTE = "<=",
  /** Explicit set inclusion boundary validation operator */
  IN = "IN",

  // =========================================================================
  // Mathematical Functional Operators
  // =========================================================================
  /** Arithmetic addition computational token */
  ADD = "+",
  /** Arithmetic subtraction computational token */
  SUB = "-",
  /** Arithmetic multiplication computational token */
  MUL = "*",
  /** Arithmetic division computational token */
  DIV = "/",
  /** Remainder arithmetic modulo computational token */
  MOD = "%",

  // =========================================================================
  // Advanced Pattern / Substring Extraction Filters
  // =========================================================================
  /** Case-sensitive wild-card pattern matching substring filter */
  CONTAINS = "%%",
  /** Case-insensitive wild-card pattern matching substring filter */
  ICONTAINS = "i%%",
  /** Case-sensitive prefix pattern matching positional filter */
  STARTSWITH = "^%%",
  /** Case-insensitive prefix pattern matching positional filter */
  ISTARTSWITH = "^i%%",
  /** Case-sensitive suffix pattern matching positional filter */
  ENDSWITH = "%%$",
  /** Case-insensitive suffix pattern matching positional filter */
  IENDSWITH = "i%%$",
}

export default FilterTypes;