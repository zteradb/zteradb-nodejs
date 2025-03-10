/**
 * Represents a group of filter conditions that can be applied to fields for the query.
 * This class extends the CommonCondition class and provides specific filter operations.
 */
export class FilterCondition extends CommonCondition {
    /**
     * Adds an equality filter to the filter group.
     * This filter checks if a field equals a specific value.
     *
     * @param {any} param - The param to be checked.
     * @param {any} result - The result to compare the field with.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if the `field` is not provided.
     */
    setEqualFilter(param: any, result: any): FilterCondition;
    /**
     * Adds a 'contains' filter to the filter group.
     * This filter checks if a field contains a specific substring.
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field contains.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setContainsFilter(field: string, value: string): FilterCondition;
    /**
     * Adds a 'case-insensitive contains' filter to the filter group.
     * This filter checks if a field contains a specific substring (case-insensitive).
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field contains (case-insensitive).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setIContainsFilter(field: string, value: string): FilterCondition;
    /**
     * Adds a 'starts with' filter to the filter group.
     * This filter checks if a field starts with a specific substring.
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field starts with.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setStartsWithFilter(field: string, value: string): FilterCondition;
    /**
     * Adds a 'case-insensitive starts with' filter to the filter group.
     * This filter checks if a field starts with a specific substring (case-insensitive).
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field starts with (case-insensitive).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setIStartsWithFilter(field: string, value: string): FilterCondition;
    /**
     * Adds an 'ends with' filter to the filter group.
     * This filter checks if a field ends with a specific substring.
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field ends with.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setEndsWithFilter(field: string, value: string): FilterCondition;
    /**
     * Adds a 'case-insensitive ends with' filter to the filter group.
     * This filter checks if a field ends with a specific substring (case-insensitive).
     *
     * @param {string} field - The field to be checked.
     * @param {string} value - The substring to check if the field ends with (case-insensitive).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `field` or `value` are not strings.
     */
    setIEndsWithFilter(field: string, value: string): FilterCondition;
    /**
     * Adds a 'modulo' filter to the filter group.
     * This filter checks if the result of a modulo operation between two values is true.
     *
     * @param {any} numerator - The numerator value (or a field).
     * @param {any} denominator - The denominator value (or a field).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if either leftValue or rightValue are not valid.
     */
    setModuloFilter(numerator: any, denominator: any): FilterCondition;
    /**
     * Adds an 'OR' filter to the filter group.
     * This filter applies a logical OR between multiple filters. If any of the conditions in the list is true, the entire filter group evaluates to true.
     *
     * @param {Array} fields - A list of field filters to be evaluated with an OR condition.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `fields` is not an array.
     */
    setOrFilter(fields: any[]): FilterCondition;
    /**
     * Adds an 'AND' filter to the filter group.
     * This filter applies a logical AND between multiple filters. All conditions in the list must be true for the filter group to evaluate to true.
     *
     * @param {Array} fields - A list of field filters to be evaluated with an AND condition.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `fields` is not an array.
     */
    setAndFilter(filters: any): FilterCondition;
    /**
     * Adds an 'IN' filter to the filter group.
     * This filter checks if a key field matches any value in a given list.
     *
     * @param {string} field - The schema field to check against the list of values.
     * @param {Array} values - A list of values to check if the field is part of.
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `values` is not an array.
     */
    setInFilter(field: string, values: any[]): FilterCondition;
    /**
     * Adds a 'Greater Than' filter to the filter group.
     * This filter checks if a value is greater than another value.
     *
     * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
     */
    setGreaterThanFilter(params: any[]): FilterCondition;
    /**
     * Adds a 'Greater Than or Equal To' filter to the filter group.
     * This filter checks if a value is greater than or equal to another value.
     *
     * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
     */
    setGreaterThanEqualFilter(params: any[]): FilterCondition;
    /**
     * Adds a 'Less Than' filter to the filter group.
     * This filter checks if a value is less than another value.
     *
     * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
     */
    setLessThanFilter(params: any[]): FilterCondition;
    /**
     * Adds a 'Less Than or Equal To' filter to the filter group.
     * This filter checks if a value is less than or equal to another value.
     *
     * @param {Array} params - A list of at least two elements: the left value (field or value) and the right value (field or value).
     * @returns {FilterCondition} The current instance for method chaining.
     * @throws {ZTeraDBConditionError} Throws an error if `params` is not an array or if it contains fewer than two elements.
     */
    setLessThanEqualFilter(params: any[]): FilterCondition;
}
/**
 * Abstract base class representing a common condition.
 * This class defines the structure for filter operations but should not be instantiated directly.
 */
declare class CommonCondition {
    filters: any[];
    /**
     * Abstract method that should be implemented by subclasses.
     * Each subclass must define its own logic to return the fields involved in the filter group.
     * @throws {ZTeraDBConditionError} Throws error if not implemented by subclass.
     */
    getFields(): void;
    /**
     * Returns the fields in the current filter group.
     * If there is only one filter, it returns that filter, otherwise it returns the entire list of filters.
     * @returns {Array|Object} The fields or the filters array.
     */
    getFields(): any[] | any;
    /**
     * Adds an 'ADD' filter operation to the current filter group.
     * @param {Array} values The values to be added.
     * @returns {CommonCondition} The current instance for method chaining.
     */
    setAdd(values: any[]): CommonCondition;
    /**
     * Adds a 'SUB' filter operation to the current filter group.
     * @param {Array} values The values to be subtracted.
     * @returns {CommonCondition} The current instance for method chaining.
     */
    setSub(values: any[]): CommonCondition;
    /**
     * Adds a 'MUL' filter operation to the current filter group.
     * @param {Array} values The values to be multiplied.
     * @returns {CommonCondition} The current instance for method chaining.
     */
    setMul(values: any[]): CommonCondition;
    /**
     * Adds a 'DIV' filter operation to the current filter group.
     * @param {any} dividend The divisor value.
     * @param {any} divisor The divisor value.
     * @returns {CommonCondition} The current instance for method chaining.
     */
    setDiv(dividend: any, divisor: any): CommonCondition;
    /**
     * Converts a value to a JSON string representation.
     * @param {any} value The value to be converted.
     * @returns {string} The JSON string representation of the value.
     */
    toJSON(value: any): string;
    /**
     * Returns the JSON string representation of the filter group.
     * @returns {string} The JSON string representation of the filter group.
     */
    getJSON(): string;
}
export {};
