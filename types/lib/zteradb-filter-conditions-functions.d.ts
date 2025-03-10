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
export function ZTAND(filters: any[]): typeof FilterCondition;
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
export function ZTOR(filters: any[]): typeof FilterCondition;
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
export function ZTEQUAL(param: any, result: any): typeof FilterCondition;
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
export function ZTIN(key: string, values: any[]): typeof FilterCondition;
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
export function ZTADD(values: any[]): typeof FilterCondition;
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
export function ZTSUB(values: any[]): typeof FilterCondition;
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
export function ZTMUL(values: any[]): typeof FilterCondition;
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
export function ZTDIV(dividend: any, divisor: any): typeof FilterCondition;
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
export function ZTMOD(numerator: any, denominator: any): typeof FilterCondition;
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
export function ZTGT(values: any[]): typeof FilterCondition;
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
export function ZTGTE(values: any[]): typeof FilterCondition;
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
export function ZTLT(values: any[]): typeof FilterCondition;
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
export function ZTLTE(values: any[]): typeof FilterCondition;
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
export function ZTCONTAINS(field: string, value: string): typeof FilterCondition;
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
export function ZTICONTAINS(field: string, value: string): typeof FilterCondition;
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
export function ZTSTARTSWITH(field: string, value: string): typeof FilterCondition;
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
export function ZTISTARTSWITH(field: string, value: string): typeof FilterCondition;
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
export function ZTENDSWITH(field: string, value: string): typeof FilterCondition;
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
export function ZTIENDSWITH(field: string, value: string): typeof FilterCondition;
import FilterCondition = require("zteradb/src/lib/zteradb-filter-conditions");
