/**
 * @file query/zteradb-filter-conditions-functions.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Filter Condition Functions Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * This file defines a set of helper functions that interact with the `FilterCondition` class to 
 * generate specific filter conditions for various operations (e.g., ADD, SUB, MUL, DIV, EQUAL, IN, etc.).
 * These functions provide a more convenient and concise API for constructing filter conditions by chaining 
 * various operators like equality, greater than, contains, starts with, etc., for use in query-building.
 *
 * @dependencies 
 * - `FilterCondition`: Class that defines methods to create and manage filter conditions with various operators.
 *
 * @example
 * import { ZTEQUAL, ZTAND, ZTGT } from './query/zteradb-filter-conditions-functions.js';
 * const result = ZTEQUAL('field1', 'value1');
 * const filter = ZTAND([ZTEQUAL('field1', 'value1'), ZTGT(['field2', 100])]);
 *
 * @package     zteradb.query
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import { FilterCondition } from "./zteradb-filter-conditions.js";

/**
 * Applies an equality filter to a new `FilterCondition` instance.
 * @param param - The param to check for equality. Example: "name", "age"
 * @param result - The result to compare the field with. Example: 2, "a"
 * @returns A new `FilterCondition` instance with the equality filter applied.
 */
export function ZTEQUAL(param: any, result: any): FilterCondition;

/**
 * Applies a multiplication filter to a new `FilterCondition` instance.
 * @param values - The values to be multiplied in the filter. Example: [1, 2, 3] -\> (1 * 2 * 3)
 * @returns A new `FilterCondition` instance with the multiplication filter applied.
 */
export function ZTMUL(values: any[]): FilterCondition;

/**
 * Applies a subtraction filter to a new `FilterCondition` instance.
 * @param values - The parameters to be subtracted in the filter. Example: [field, 2, 3] -\> (field - 2 - 3)
 * @returns A new `FilterCondition` instance with the subtraction filter applied.
 */
export function ZTSUB(values: any[]): FilterCondition;

/**
 * Applies a division filter to a new `FilterCondition` instance.
 * @param dividend - The dividend (first value) in the division.
 * @param divisor - The divisor (second value) in the division.
 * @returns A new `FilterCondition` instance with the division filter applied.
 */
export function ZTDIV(dividend: any, divisor: any): FilterCondition;

/**
 * Applies an addition filter to a new `FilterCondition` instance.
 * @param values - The parameters to be added in the filter. Example: [field, 2, 3] -\> (field + 2 + 3)
 * @returns A new `FilterCondition` instance with the addition filter applied.
 */
export function ZTADD(values: any[]): FilterCondition;

/**
 * Applies an 'IN' filter to a new `FilterCondition` instance.
 * @param key - The field to check for inclusion. Example: field
 * @param values - The list of values to compare with the key. Example: [1, 2, 3]
 * @returns A new `FilterCondition` instance with the 'IN' filter applied.
 */
export function ZTIN(key: string, values: any[]): FilterCondition;

/**
 * Applies an 'OR' filter to a new `FilterCondition` instance.
 * @param filters - The list of filter conditions to combine using an OR operator.
 * @returns A new `FilterCondition` instance with the 'OR' filter applied.
 */
export function ZTOR(filters: FilterCondition[]): FilterCondition;

/**
 * Applies an 'AND' filter to a new `FilterCondition` instance.
 * @param filters - The list of filter conditions to combine using an AND operator.
 * @returns A new `FilterCondition` instance with the 'AND' filter applied.
 */
export function ZTAND(filters: FilterCondition[]): FilterCondition;

/**
 * Applies a 'Greater Than' filter to a new `FilterCondition` instance.
 * @param values - The list containing the values to compare: the left and right operands.
 * @returns A new `FilterCondition` instance with the 'Greater Than' filter applied.
 */
export function ZTGT(values: any[]): FilterCondition;

/**
 * Applies a 'Greater Than or Equal To' filter to a new `FilterCondition` instance.
 * @param values - The list containing the values to compare: the left and right operands.
 * @returns A new `FilterCondition` instance with the 'Greater Than or Equal To' filter applied.
 */
export function ZTGTE(values: any[]): FilterCondition;

/**
 * Applies a 'Less Than' filter to a new `FilterCondition` instance.
 * @param values - The list containing the values to compare: the left and right operands.
 * @returns A new `FilterCondition` instance with the 'Less Than' filter applied.
 */
export function ZTLT(values: any[]): FilterCondition;

/**
 * Applies a 'Less Than or Equal To' filter to a new `FilterCondition` instance.
 * @param values - The list containing the values to compare: the left and right operands.
 * @returns A new `FilterCondition` instance with the 'Less Than or Equal To' filter applied.
 */
export function ZTLTE(values: any[]): FilterCondition;

/**
 * Applies a modulo filter to a new `FilterCondition` instance.
 * @param numerator - The numerator for the modulo operation.
 * @param denominator - The denominator for the modulo operation.
 * @returns A new `FilterCondition` instance with the modulo filter applied.
 */
export function ZTMOD(numerator: any, denominator: any): FilterCondition;

/**
 * Applies a contains filter to a new `FilterCondition` instance.
 * @param field - The field name to check for containing the value.
 * @param value - The value to check if the field contains.
 * @returns A new `FilterCondition` instance with the contains filter applied.
 */
export function ZTCONTAINS(field: string, value: string): FilterCondition;

/**
 * Applies a case-insensitive contains filter to a new `FilterCondition` instance.
 * @param field - The field name to check for containing the value.
 * @param value - The value to check if the field contains.
 * @returns A new `FilterCondition` instance with the case-insensitive contains filter applied.
 */
export function ZTICONTAINS(field: string, value: string): FilterCondition;

/**
 * Applies a starts with filter to a new `FilterCondition` instance.
 * @param field - The field name to check for the starting value.
 * @param value - The value to check if the field starts with.
 * @returns A new `FilterCondition` instance with the starts-with filter applied.
 */
export function ZTSTARTSWITH(field: string, value: string): FilterCondition;

/**
 * Applies a case-insensitive starts with filter to a new `FilterCondition` instance.
 * @param field - The field name to check for the starting value.
 * @param value - The value to check if the field starts with.
 * @returns A new `FilterCondition` instance with the case-insensitive starts-with filter applied.
 */
export function ZTISTARTSWITH(field: string, value: string): FilterCondition;

/**
 * Applies an ends with filter to a new `FilterCondition` instance.
 * @param field - The field name to check for the ending value.
 * @param value - The value to check if the field ends with.
 * @returns A new `FilterCondition` instance with the ends-with filter applied.
 */
export function ZTENDSWITH(field: string, value: string): FilterCondition;

/**
 * Applies a case-insensitive ends with filter to a new `FilterCondition` instance.
 * @param field - The field name to check for the ending value.
 * @param value - The value to check if the field ends with.
 * @returns A new `FilterCondition` instance with the case-insensitive ends-with filter applied.
 */
export function ZTIENDSWITH(field: string, value: string): FilterCondition;