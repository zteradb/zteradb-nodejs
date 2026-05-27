/**
 * @file query/zteradb-filter-conditions-functions.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Filter Condition Functions
 * --------------------------------------------------------------------------
 * 
 * @description This file defines a set of helper functions that interact with the `FilterCondition` class to 
 * generate specific filter conditions for various operations (e.g., ADD, SUB, MUL, DIV, EQUAL, IN, etc.).
 * These functions provide a more convenient and concise API for constructing filter conditions by chaining 
 * various operators like equality, greater than, contains, starts with, etc., for use in query-building.
 *  
 * @dependencies 
 *   - `FilterCondition`: Class that defines methods to create and manage filter conditions with various operators.
 * 
 * @example
 *   const result = ZTEQUAL('field1', 'value1');
 *   
 *   The above line creates a filter condition using the `ZTEQUAL` function. This function checks if the value of the field 
 *   `field1` is equal to the string `'value1'`. The resulting filter condition is stored in the variable `result`.
 *
 *    const filter = ZTAND([ZTEQUAL('field1', 'value1'), ZTGT('field2', 100)]);
 *   
 *    The above line creates a filter condition using the `ZTAND` function. The `ZTAND` function combines multiple filter 
 *    conditions using the logical AND operator. In this case, two conditions are being combined:
 *    1. The first condition, created by `ZTEQUAL('field1', 'value1')`, checks if `field1` equals `'value1'`.
 *    2. The second condition, created by `ZTGT('field2', 100)`, checks if `field2` is greater than `100`.
 * 
 *    The `ZTAND` function ensures that both conditions must be true for the overall filter to pass. The resulting combined 
 *    filter condition is stored in the variable `filter`.
 * 
 * 
 * @package     zteradb.query
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

// Importing filter-conditions.js
import { FilterCondition } from "@zteradb/client/query/zteradb-filter-conditions";


/**
 * 
 * Applies an equality filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies an equality filter, checking if a key matches the given value.
 * An error will be thrown if the key or params are invalid.
 * 
 * @param {any} param - The param to check for equality.  Example: "name", "age",
 * @param {any} result - The result to compare the field with.  Example: 2, "a"
 * @returns {FilterCondition} A new `FilterCondition` instance with the equality filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or missing.
 */
function ZTEQUAL(param, result) {
  return new FilterCondition().setEqualFilter(param, result);  // May throw error if key or result are not valid
}

/**
 * Applies a multiplication filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Mul' filter using the given parameters.
 * The filter multiplies the provided values. If the parameters are invalid or missing, an error will be thrown.
 * 
 * @param {Array} values - The values to be multiplied in the filter.
 *                          For example: [1, 2, 3]  will be translated to (1 * 2 * 3)
 * @returns {FilterCondition} A new `FilterCondition` instance with the multiplication filter applied.
 * @throws {ZTeraDBError} If invalid parameters are passed or required parameters are missing.
 */
function ZTMUL(values) {
  return new FilterCondition().setMul(values);  // May throw error if values are not valid
}

/**
 * Applies a subtraction filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Sub' filter using the given parameters.
 * The filter subtracts the provided values. An error is thrown if the parameters are invalid or missing.
 * 
 * @param {Array} values - The parameters to be subtracted in the filter.
 *                          For example: [field, 2, 3]  will be translated to (field - 2 - 3)
 * @returns {FilterCondition} A new `FilterCondition` instance with the subtraction filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or missing.
 */
function ZTSUB(values) {
  return new FilterCondition().setSub(values);  // May throw error if values are not valid
}

/**
 * Applies a division filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Div' filter using the provided two values.
 * The filter divides the first value by the second. Errors will be thrown if invalid or missing parameters are provided.
 * 
 * @param {any} dividend - The dividend (first value) in the division.
 * @param {any} divisor - The divisor (second value) in the division.
 * @returns {FilterCondition} A new `FilterCondition` instance with the division filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or missing.
 */
function ZTDIV(dividend, divisor) {
  return new FilterCondition().setDiv(dividend, divisor); // May throw error if dividend or divisor are not valid
}

/**
 * Applies an addition filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Add' filter using the given parameters.
 * The filter adds the provided values. An error will be thrown if the parameters are invalid or missing.
 * 
 * @param {Array} values - The parameters to be added in the filter.
 *                          For example: [field, 2, 3]  will be translated to (field + 2 + 3)
 * @returns {FilterCondition} A new `FilterCondition` instance with the addition filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or missing.
 */
function ZTADD(values) {
  return new FilterCondition().setAdd(values);  // May throw error if values are not valid
}

/**
 * Applies an 'IN' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'IN' filter, checking if a key is in the provided list of values.
 * An error is thrown if the parameters are not valid, such as if the values are not an array.
 * 
 * @param {string} key - The field to check for inclusion. Example: field
 * @param {Array} values - The list of values to compare with the key.  Example: [1, 2, 3]
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'IN' filter applied for generating ZTeraDBQuery().
 * @throws {ZTeraDBError} If the values parameter is not an array or if required fields are missing.
 */
function ZTIN(key, values) {
  return new FilterCondition().setInFilter(key, values);  // May throw error if key or values are not valid
}

/**
 * Applies an 'OR' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'OR' filter, combining multiple conditions with a logical OR.
 * An error is thrown if the parameters are invalid, such as if the fields are not in an array.
 * 
 * @param {Array} filters - The list of filter conditions to combine using an OR operator.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'OR' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array.
 */
function ZTOR(filters) {
  return new FilterCondition().setOrFilter(filters); // May throw error if values are not valid
}

/**
 * Applies an 'AND' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'AND' filter, combining multiple conditions with a logical AND.
 * An error will be thrown if the parameters are invalid, such as if the fields are not an array.
 * 
 * @param {Array} filters - The list of filter conditions to combine using an AND operator.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'AND' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array.
 */
function ZTAND(filters) {
  return new FilterCondition().setAndFilter(filters);   // May throw error if values are not valid
}

/**
 * Applies a 'Greater Than' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Greater Than' filter, comparing a value with another.
 * An error will be thrown if the parameters are invalid or if the list is not in the expected format.
 * 
 * @param {Array} values - The list containing the values to compare: the left and right operands.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'Greater Than' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array, or if the list has less than 2 elements.
 */
function ZTGT(values) {
  return new FilterCondition().setGreaterThanFilter(values);  // May throw error if values are not valid
}

/**
 * Applies a 'Greater Than or Equal To' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Greater Than or Equal To' filter.
 * An error will be thrown if the parameters are invalid or the list is not properly formatted.
 * 
 * @param {Array} values - The list containing the values to compare: the left and right operands.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'Greater Than or Equal To' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array, or if the list has less than 2 elements.
 */
function ZTGTE(values) {
  return new FilterCondition().setGreaterThanEqualFilter(values); // May throw error if values are not valid
}

/**
 * Applies a 'Less Than' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Less Than' filter, comparing a value with another.
 * An error will be thrown if the parameters are invalid or the list is not in the expected format.
 * 
 * @param {Array} values - The list containing the values to compare: the left and right operands.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'Less Than' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array, or if the list has less than 2 elements.
 */
function ZTLT(values) {
  return new FilterCondition().setLessThanFilter(values); // May throw error if values are not valid
}

/**
 * Applies a 'Less Than or Equal To' filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Less Than or Equal To' filter.
 * An error will be thrown if the parameters are invalid or the list is not in the expected format.
 * 
 * @param {Array} values - The list containing the values to compare: the left and right operands.
 * @returns {FilterCondition} A new `FilterCondition` instance with the 'Less Than or Equal To' filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or not an array, or if the list has less than 2 elements.
 */
function ZTLTE(values) {
  return new FilterCondition().setLessThanEqualFilter(values); // May throw error if values are not valid
}

/**
 * Applies a modulo filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Modulo' filter, which calculates the remainder of division.
 * An error will be thrown if invalid parameters are provided or required parameters are missing.
 * 
 * @param {any} numerator - The numerator for the modulo operation.
 * @param {any} denominator - The denominator for the modulo operation.
 * @returns {FilterCondition} A new `FilterCondition` instance with the modulo filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid or missing.
 */
function ZTMOD(numerator, denominator) {
  return new FilterCondition().setModuloFilter(numerator, denominator); // May throw error if numerator or denominator are not valid
}

/**
 * Applies a contains filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'Contains' filter, checking if a field contains a value.
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for containing the value.
 * @param {string} value - The value to check if the field contains.
 * @returns {FilterCondition} A new `FilterCondition` instance with the contains filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTCONTAINS(field, value) {
  return new FilterCondition().setContainsFilter(field, value); // May throw error if field or value are not valid
}

/**
 * Applies a case-insensitive contains filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'IContains' filter, checking if a field contains a value (case-insensitive).
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for containing the value.
 * @param {string} value - The value to check if the field contains.
 * @returns {FilterCondition} A new `FilterCondition` instance with the case-insensitive contains filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTICONTAINS(field, value) {
  return new FilterCondition().setIContainsFilter(field, value);  // May throw error if field or value are not valid
}

/**
 * Applies a starts with filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'StartsWith' filter, checking if a field starts with a value.
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for the starting value.
 * @param {string} value - The value to check if the field starts with.
 * @returns {FilterCondition} A new `FilterCondition` instance with the starts-with filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTSTARTSWITH(field, value) {
  return new FilterCondition().setStartsWithFilter(field, value); // May throw error if field or value are not valid
}

/**
 * Applies a case-insensitive starts with filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'IStartsWith' filter, checking if a field starts with a value (case-insensitive).
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for the starting value.
 * @param {string} value - The value to check if the field starts with.
 * @returns {FilterCondition} A new `FilterCondition` instance with the case-insensitive starts-with filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTISTARTSWITH(field, value) {
  return new FilterCondition().setIStartsWithFilter(field, value);  // May throw error if field or value are not valid
}

/**
 * Applies an ends with filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'EndsWith' filter, checking if a field ends with a value.
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for the ending value.
 * @param {string} value - The value to check if the field ends with.
 * @returns {FilterCondition} A new `FilterCondition` instance with the ends-with filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTENDSWITH(field, value) {
  return new FilterCondition().setEndsWithFilter(field, value); // May throw error if field or value are not valid
}

/**
 * Applies a case-insensitive ends with filter to a new `FilterCondition` instance.
 * 
 * This function creates a new instance of `FilterCondition` and applies the 'IEndsWith' filter, checking if a field ends with a value (case-insensitive).
 * An error will be thrown if the parameters are invalid or not strings.
 * 
 * @param {string} field - The field name to check for the ending value.
 * @param {string} value - The value to check if the field ends with.
 * @returns {FilterCondition} A new `FilterCondition` instance with the case-insensitive ends-with filter applied.
 * @throws {ZTeraDBError} If the parameters are invalid (e.g., non-string values).
 */
function ZTIENDSWITH(field, value) {
  return new FilterCondition().setIEndsWithFilter(field, value);  // May throw error if field or value are not valid
}


export {
  ZTAND,          // Export ZTAND for logical AND filter
  ZTOR,           // Export ZTOR for logical OR filter
  ZTEQUAL,        // Export ZTEQUAL for equal of two fields / values
  ZTIN,           // Export ZTIN for field lookup
  ZTADD,          // Export ZTADD for addition of two or more fields
  ZTSUB,          // Export ZTDUB for substraction of two or more fields
  ZTMUL,          // Export ZTMUL for multiplication of two or more fields
  ZTDIV,          // Export ZTDIV for division of two fields
  ZTMOD,          // Export ZTMOD for modulo of two fields
  ZTGT,           // Export ZTGT for logical greater than for two or more fields / values
  ZTGTE,          // Export ZTGTE for logical greater than or equal to for two or more fields / values
  ZTLT,           // Export ZTLT for logical less than for two or more fields / values
  ZTLTE,          // Export ZTLT for logical less than or equal to for two or more fields / values
  ZTCONTAINS,     // Export ZTCONTAINS for value case-sensitive contains in the field
  ZTICONTAINS,    // Export ZTCONTAINS for value case-insensitive contains in the field
  ZTSTARTSWITH,   // Export ZTSTARTSWITH for value case-sensitive starts with in the field
  ZTISTARTSWITH,  // Export ZTSTARTSWITH for value case-insensitive starts with in the field
  ZTENDSWITH,     // Export ZTENDSWITH for value case-sensitive ends with in the field
  ZTIENDSWITH     // Export ZTIENDSWITH for value case-insensitive ends with in the field
};