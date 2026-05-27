/**
 * @file query/zteradb-filter-conditions.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Filter Condition Class Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * This declaration file models the `FilterCondition` class hierarchy which provides methods 
 * for creating and managing various fluid filter conditions (such as equality, inclusion, 
 * pattern matching, etc.) that can be compiled to abstract syntax fields.
 *
 * @dependencies 
 * - `ZTeraDBConditionError`: Custom error handling class for throwing specific error codes.
 * - `FilterTypes`: A constants module providing filter types for different operations.
 *
 * @example
 * import { FilterCondition } from './query/zteradb-filter-conditions.js';
 * const filter = new FilterCondition().setEqualFilter("field1", "value1");
 *
 * @class       FilterCondition
 * @package     zteradb.query
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import { ZTeraDBConditionError } from "@zteradb/client/helper/zteradb-exception";
import FilterTypes from "@zteradb/client/constants/zteradb-filter-types";

/**
 * Interface detailing structural properties inside a single evaluation vector.
 */
interface FilterPayload {
  operator: FilterTypes;
  operand: any;
  result?: any;
}

/**
 * Abstract base class representing shared structural logic for filter groupings.
 * Should not be instantiated directly.
 */
declare abstract class CommonCondition {
  /** Internal storage array collecting operational conditions. */
  protected filters: FilterPayload[];

  constructor();

  /**
   * Abstract token method tracking the implementation layer layout extraction.
   */
  getFields(): any;

  /**
   * Adds an 'ADD' filter operation to the current filter group.
   * @param values The values to be added.
   */
  setAdd(values: any[]): this;

  /**
   * Adds a 'SUB' filter operation to the current filter group.
   * @param values The values to be subtracted.
   */
  setSub(values: any[]): this;

  /**
   * Adds a 'MUL' filter operation to the current filter group.
   * @param values The values to be multiplied.
   */
  setMul(values: any[]): this;

  /**
   * Adds a 'DIV' filter operation to the current filter group.
   * @param dividend The divisor value.
   * @param divisor The divisor value.
   */
  setDiv(dividend: any, divisor: any): this;

  /**
   * Converts a value to a JSON string representation.
   */
  toJSON(value: any): string;

  /**
   * Returns the JSON string representation of the filter group context.
   */
  getJSON(): string;
}

/**
 * Represents a group of filter conditions that can be applied to fields for the query.
 */
export class FilterCondition extends CommonCondition {
  constructor();

  /**
   * Overridden verification target extracting built filter payload data.
   */
  getFields(): FilterPayload | FilterPayload[];

  /**
   * Adds an equality filter to the filter group.
   * @param param - The param to be checked.
   * @param result - The result to compare the field with.
   */
  setEqualFilter(param: any, result: any): this;

  /**
   * Adds a 'contains' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field contains.
   */
  setContainsFilter(field: string, value: string): this;

  /**
   * Adds a 'case-insensitive contains' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field contains (case-insensitive).
   */
  setIContainsFilter(field: string, value: string): this;

  /**
   * Adds a 'starts with' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field starts with.
   */
  setStartsWithFilter(field: string, value: string): this;

  /**
   * Adds a 'case-insensitive starts with' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field starts with (case-insensitive).
   */
  setIStartsWithFilter(field: string, value: string): this;

  /**
   * Adds an 'ends with' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field ends with.
   */
  setEndsWithFilter(field: string, value: string): this;

  /**
   * Adds a 'case-insensitive ends with' filter to the filter group.
   * @param field - The field to be checked.
   * @param value - The substring to check if the field ends with (case-insensitive).
   */
  setIEndsWithFilter(field: string, value: string): this;

  /**
   * Adds a 'modulo' filter to the filter group.
   * @param numerator - The numerator value (or a field).
   * @param denominator - The denominator value (or a field).
   */
  setModuloFilter(numerator: any, denominator: any): this;

  /**
   * Adds an 'OR' filter to the filter group.
   * @param fields - A list of field filters to be evaluated with an OR condition.
   */
  setOrFilter(fields: any[]): this;

  /**
   * Adds an 'AND' filter to the filter group.
   * @param filters - A list of field filters to be evaluated with an AND condition.
   */
  setAndFilter(filters: any[]): this;

  /**
   * Adds an 'IN' filter to the filter group.
   * @param field - The schema field to check against the list of values.
   * @param values - A list of values to check if the field is part of.
   */
  setInFilter(field: string, values: any[]): this;

  /**
   * Adds a 'Greater Than' filter to the filter group.
   * @param params - A list of at least two elements: left and right operands.
   */
  setGreaterThanFilter(params: any[]): this;

  /**
   * Adds a 'Greater Than or Equal To' filter to the filter group.
   * @param params - A list of at least two elements: left and right operands.
   */
  setGreaterThanEqualFilter(params: any[]): this;

  /**
   * Adds a 'Less Than' filter to the filter group.
   * @param params - A list of at least two elements: left and right operands.
   */
  setLessThanFilter(params: any[]): this;

  /**
   * Adds a 'Less Than or Equal To' filter to the filter group.
   * @param params - A list of at least two elements: left and right operands.
   */
  setLessThanEqualFilter(params: any[]): this;
}