/**
 * @file filter-conditions.js
 * 
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 * 
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 * 
 * @description This file defines the `FilterCondition` class which provides methods for creating and managing 
 * various filter conditions (such as equality, inclusion, pattern matching, etc.) that can be applied to data.
 * The class supports a variety of operators (e.g., ADD, SUB, MUL, DIV, IN, EQUAL, etc.) for constructing complex queries.
 * 
 * @dependencies 
 *   - `ZTeraDBConditionError`: Custom error handling class for throwing specific error codes.
 *   - `FilterTypes`: A constants module providing filter types for different operations.
 * 
 * @example
 *   const filter = new FilterCondition().setEqualFilter("field1", "value1");
 * 
 * @class FilterCondition
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */


// Importing necessary classes and constants
import { ZTeraDBConditionError } from "../helper/zteradb-exception.mjs";  // ZTERADB error handling
import FilterTypes from "../constants/zteradb-filter-types.mjs";  // Import ZTERADB filter operators like ADD, SUB, etc.

/**
 * Abstract base class representing a common condition.
 * This class defines the structure for filter operations but should not be instantiated directly.
 */
class CommonCondition {
  constructor() {
    // Prevent instantiation of the abstract class
    if (new.target === CommonCondition) {
      throw new ZTeraDBConditionError("Initialization error", -1, "Cannot instantiate the abstract class CommonCondition directly.");
    }

    // Initialize the filters array to store filter operations
    this.filters = [];
  }

  /**
   * Abstract method that should be implemented by subclasses.
   * Each subclass must define its own logic to return the fields involved in the filter group.
   * @throws {ZTeraDBConditionError} Throws error if not implemented by subclass.
   */
  getFields() {
    throw new ZTeraDBConditionError("Method not implemented", -1, "The method 'getFields' must be implemented by a subclass.");
  }

  /**
   * Adds an 'ADD' filter operation to the current filter group.
   * @param {Array} values The values to be added.
   * @returns {CommonCondition} The current instance for method chaining.
   */
  setAdd(values) {
    if(values instanceof Array === false) {
      throw new ZTeraDBConditionError("Invalid value", -1, "Invalid `values`");
    }

    let operands = [];

    values.forEach(value => {
      // If the value is an instance of FilterCondition, retrieve its fields.
      value = (value instanceof FilterCondition) ? value.getFields() : value; 
      operands.push(value);
    });

    // Push the 'ADD' operation to the filters array
    this.filters.push({operator: FilterTypes.ADD, operand: operands});
    return this;
  }

  /**
   * Adds a 'SUB' filter operation to the current filter group.
   * @param {Array} values The values to be subtracted.
   * @returns {CommonCondition} The current instance for method chaining.
   */
  setSub(values) {
    if(values instanceof Array === false) {
      throw new ZTeraDBConditionError("Invalid value", -1, "Invalid `values`");
    }

    let operands = [];

    values.forEach(value => {
      // If the value is an instance of FilterCondition, retrieve its fields.
      value = (value instanceof FilterCondition) ? value.getFields() : value; 
      operands.push(value);
    });

    // Push the 'SUB' operation to the filters array
    this.filters.push({operator: FilterTypes.SUB, operand: operands});
    return this;
  }

  /**
   * Adds a 'MUL' filter operation to the current filter group.
   * @param {Array} values The values to be multiplied.
   * @returns {CommonCondition} The current instance for method chaining.
   */
  setMul(values) {
    if(values instanceof Array === false) {
      throw new ZTeraDBConditionError("Invalid value", -1, "Invalid `values`");
    }

    let operands = [];

    values.forEach(value => {
      // If the value is an instance of FilterCondition, retrieve its fields.
      value = (value instanceof FilterCondition) ? value.getFields() : value; 
      operands.push(value);
    });

    // Push the 'MUL' operation to the filters array
    this.filters.push({operator: FilterTypes.MUL, operand: operands});
    return this;
  }

  /**
   * Adds a 'DIV' filter operation to the current filter group.
   * @param {any} dividend The divisor value.
   * @param {any} divisor The divisor value.
   * @returns {CommonCondition} The current instance for method chaining.
   */
  setDiv(dividend, divisor) {
    if (["number", "string", undefined].includes(typeof dividend) === false) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "`dividend` must be integer, float or schema field name");
    }

    if (["number", "string", undefined].includes(typeof divisor) === false) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "`divisor` must be integer, float or schema field name");
    }

    // If the dividend or divisor is an instance of FilterCondition, extract their fields.
    dividend = (dividend instanceof FilterCondition) ? dividend.getFields(): dividend;
    divisor = (divisor instanceof FilterCondition) ? divisor.getFields(): divisor;

    // Push the 'DIV' operation to the filters array
    this.filters.push({operator: FilterTypes.DIV, operand: [dividend, divisor]});
    return this;
  }

  /**
   * Returns the fields in the current filter group.
   * If there is only one filter, it returns that filter, otherwise it returns the entire list of filters.
   * @returns {Array|Object} The fields or the filters array.
   */
  getFields() {
    return (this.filters.length === 1) ? this.filters[0]: this.filters;
  }

  /**
   * Converts a value to a JSON string representation.
   * @param {any} value The value to be converted.
   * @returns {string} The JSON string representation of the value.
   */
  toJSON(value) {
    return JSON.stringify(value);
  }

  /**
   * Returns the JSON string representation of the filter group.
   * @returns {string} The JSON string representation of the filter group.
   */
  getJSON() {
    return this.toJSON(this.getFields());
  }
}

/**
 * Represents a group of filter conditions that can be applied to fields for the query.
 * This class extends the CommonCondition class and provides specific filter operations.
 */
export class FilterCondition extends CommonCondition {
  constructor() {
    super();  // Call the parent class constructor
  }

  /**
   * Adds an equality filter to the filter group.
   * This filter checks if a field equals a specific value.
   * 
   * @param {any} param - The param to be checked.
   * @param {any} result - The result to compare the field with.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if the `field` is not provided.
   */
  setEqualFilter(param, result) {
    if (!param) {
      throw new ZTeraDBConditionError("Missing argument", -1, "The `field` argument is required.");
    }

    if (!param instanceof FilterCondition && typeof param !== "string") {
      throw new ZTeraDBConditionError("Missing argument", -1, "Invalid `params` argument.");
    }

    if(result==undefined) {
      throw new ZTeraDBConditionError("Missing argument", -1, "The `result` argument is required.");
    }

    if (result instanceof Array) {
      throw new ZTeraDBConditionError("Missing argument", -1, "Invalid `result` argument.");
    }

    if (result instanceof Object && result !== FilterCondition) {
      throw new ZTeraDBConditionError("Missing argument", -1, "Invalid `result` argument.");
    }

    // If the param or result is an instance of FilterCondition, extract their fields.
    param = (param instanceof FilterCondition) ? param.getFields(): param;
    result = (result instanceof FilterCondition) ? result.getFields(): result;

    // Push the equality filter to the filters array.
    this.filters.push({operator: FilterTypes.EQUAL, operand: param, result: result});
    return this;
  }

  /**
   * Adds a 'contains' filter to the filter group.
   * This filter checks if a field contains a specific substring.
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field contains.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setContainsFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in contains filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field value in contains filter.");
    }

    // Push the contains filter to the filters array.
    this.filters.push({operator: FilterTypes.CONTAINS, operand: field, result: value});
    return this;
  }

  /**
   * Adds a 'case-insensitive contains' filter to the filter group.
   * This filter checks if a field contains a specific substring (case-insensitive).
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field contains (case-insensitive).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setIContainsFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in icontains filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field name in icontains filter.");
    }

    // Push the case-insensitive contains filter to the filters array.
    this.filters.push({operator: FilterTypes.ICONTAINS, operand: field, result: value});
    return this;
  }

  /**
   * Adds a 'starts with' filter to the filter group.
   * This filter checks if a field starts with a specific substring.
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field starts with.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setStartsWithFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in startsWith filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field name in startsWith filter.");
    }

    // Push the startsWith filter to the filters array.
    this.filters.push({operator: FilterTypes.STARTSWITH, operand: field, result: value});
    return this;
  }

  /**
   * Adds a 'case-insensitive starts with' filter to the filter group.
   * This filter checks if a field starts with a specific substring (case-insensitive).
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field starts with (case-insensitive).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setIStartsWithFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in istartsWith filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field name in istartsWith filter.");
    }

    // Push the case-insensitive startsWith filter to the filters array.
    this.filters.push({operator: FilterTypes.ISTARTSWITH, operand: field, result: value});
    return this;
  }

  /**
   * Adds an 'ends with' filter to the filter group.
   * This filter checks if a field ends with a specific substring.
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field ends with.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setEndsWithFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in endsWith filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field name in endsWith filter.");
    }

    // Push the endsWith filter to the filters array.
    this.filters.push({operator: FilterTypes.ENDSWITH, operand: field, result: value});
    return this;
  }

  /**
   * Adds a 'case-insensitive ends with' filter to the filter group.
   * This filter checks if a field ends with a specific substring (case-insensitive).
   * 
   * @param {string} field - The field to be checked.
   * @param {string} value - The substring to check if the field ends with (case-insensitive).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
   */
  setIEndsWithFilter(field, value) {
    if (typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `field` argument must be field name in iendsWith filter.");
    }

    if (typeof value !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The `value` argument must be field name in iendsWith filter.");
    }

    // Push the case-insensitive endsWith filter to the filters array.
    this.filters.push({operator: FilterTypes.IENDSWITH, operand: field, result: value});
    return this;
  }

  /**
   * Adds a 'modulo' filter to the filter group.
   * This filter checks if the result of a modulo operation between two values is true.
   * 
   * @param {any} numerator - The numerator value (or a field).
   * @param {any} denominator - The denominator value (or a field).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if either leftValue or rightValue are not valid.
   */
  setModuloFilter(numerator, denominator) {
    if (!["number", "string", undefined].includes(typeof numerator)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "`numerator` must be integer, float or schema field name");
    }

    if (!["number", "string", undefined].includes(typeof denominator)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "`denominator` must be integer, float or schema field name");
    }

    // If the numerator or rightValue is an instance of FilterCondition, extract their fields.
    numerator = (numerator instanceof FilterCondition) ? numerator.getFields() : numerator;
    denominator = (denominator instanceof FilterCondition) ? denominator.getFields() : denominator;

    // Push the modulo filter to the filters array.
    this.filters.push({operator: FilterTypes.MOD, operand: [numerator, denominator]});
    return this;
  }

  /**
   * Adds an 'OR' filter to the filter group.
   * This filter applies a logical OR between multiple filters. If any of the conditions in the list is true, the entire filter group evaluates to true.
   * 
   * @param {Array} fields - A list of field filters to be evaluated with an OR condition.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `fields` is not an array.
   */
  setOrFilter(fields) {
    if(!Array.isArray(fields)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Or' filter must be list");
    }

    let operands = [];

    fields.forEach(field => {
      // If a field is an instance of FilterCondition, extract its fields
      if (field instanceof FilterCondition) {
        field = field.getFields();
      }
      operands.push(field);
    });

    // Push the OR filter to the filters array
    this.filters.push({operator: FilterTypes.OR, operand: operands});
    return this;
  }

  /**
   * Adds an 'AND' filter to the filter group.
   * This filter applies a logical AND between multiple filters. All conditions in the list must be true for the filter group to evaluate to true.
   * 
   * @param {Array} fields - A list of field filters to be evaluated with an AND condition.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `fields` is not an array.
   */
  setAndFilter(filters) {
    if(!Array.isArray(filters)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The filters in an 'AND' filter group must be provided as a list.");
    }

    if(filters.length < 2) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The 'AND' filter group must contain more than two filters.");
    }

    let operands = [];

    filters.forEach(filter => {
      // If a field is not an instance of FilterCondition then raise ZTeraDBConditionError
      if (!filter instanceof FilterCondition) {
        throw new ZTeraDBConditionError("Invalid argument", -1, `${filter} must be an instance of a ZT* function or a FilterCondition instance within the 'AND' filter group.`);
      }
      operands.push(filter.getFields());
    });

    // Push the AND filter to the filters array
    this.filters.push({operator: FilterTypes.AND, operand: operands});
    return this;
  }

  /**
   * Adds an 'IN' filter to the filter group.
   * This filter checks if a key field matches any value in a given list.
   * 
   * @param {string} field - The schema field to check against the list of values.
   * @param {Array} values - A list of values to check if the field is part of.
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `values` is not an array.
   */
  setInFilter(field, values) {
    if(typeof field !== "string") {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'IN' filter field must be schema field name")
    }

    if(!Array.isArray(values)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'IN' filter values must be list")
    }

    // field = (field instanceof FilterCondition) ? field.getFields() : field;

    let results = [];
    values.forEach(value => {
      // If a value is an instance of FilterCondition, extract its fields
      if (value instanceof FilterCondition) {
        value = value.getFields();
      }
      results.push(value);
    });

    // Push the IN filter to the filters array
    this.filters.push({operator: FilterTypes.IN, operand: field, result: results});
    return this;
  }

  /**
   * Adds a 'Greater Than' filter to the filter group.
   * This filter checks if a value is greater than another value.
   * 
   * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
   */
  setGreaterThanFilter(params) {
    if(!Array.isArray(params)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The 'Greater than' filter params must be list")
    }

    if(params.length < 1) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "The 'Greater than' filter params must contains atleast two element in the list")
    }

    let values = [];
    
    params.forEach(param => {
      // If a param is an instance of FilterCondition, extract its fields
      if (param instanceof FilterCondition) {
        values = param.getFields();
      }
      values.push(param);
    });

    // Push the Greater Than filter to the filters array
    this.filters.push({operator: FilterTypes.GT, operand: values});
    return this;
  }

  /**
   * Adds a 'Greater Than or Equal To' filter to the filter group.
   * This filter checks if a value is greater than or equal to another value.
   * 
   * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
   */
  setGreaterThanEqualFilter(params) {

    if(!Array.isArray(params)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Greater than or equal to' filter must be list")
    }

    if(params.length < 1) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Greater than' filter should be contains atleast two element in the list")
    }

    let values = [];
    
    params.forEach(param => {
      // If a param is an instance of FilterCondition, extract its fields
      if (param instanceof FilterCondition) {
        values = param.getFields();
      }
      values.push(param);
    });

    // Push the Greater Than or Equal To filter to the filters array
    this.filters.push({operator: FilterTypes.GTE, operand: values});
    return this;
  }

  /**
   * Adds a 'Less Than' filter to the filter group.
   * This filter checks if a value is less than another value.
   * 
   * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
   */
  setLessThanFilter(params) {
    if(!Array.isArray(params)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Less than or equal to' filter must be list")
    }

    if(params.length < 1) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Less than' filter should be contains atleast two element in the list")
    }

    let values = [];

    params.forEach(param => {
      // If a param is an instance of FilterCondition, extract its fields
      if (param instanceof FilterCondition) {
        values = param.getFields();
      }
      values.push(param);
    });

    // Push the Less Than filter to the filters array
    this.filters.push({operator: FilterTypes.LT, operand: values});
    return this;
  }

  /**
   * Adds a 'Less Than or Equal To' filter to the filter group.
   * This filter checks if a value is less than or equal to another value.
   * 
   * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
   * @returns {FilterCondition} The current instance for method chaining.
   * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
   */
  setLessThanEqualFilter(params) {
    if(!Array.isArray(params)) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Greater than or equal to' filter must be list")
    }

    if(params.length < 1) {
      throw new ZTeraDBConditionError("Invalid argument", -1, "'Greater than or equal to' filter should be contains atleast two element in the list")
    }

    let values = [];
    
    params.forEach(param => {
      // If a param is an instance of FilterCondition, extract its fields
      if (param instanceof FilterCondition) {
        values = param.getFields();
      }
      values.push(param);
    });

    // Push the Less Than or Equal To filter to the filters array
    this.filters.push({operator: FilterTypes.LTE, operand: values});
    return this;
  }
}
