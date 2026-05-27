/**
 * @file query/zteradb-query.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Query Class
 * --------------------------------------------------------------------------
 * 
 * @description 
 * This file contains the definition of the `ZTeraDBQuery` class, which provides a fluent API for constructing ZTeraDB queries.
 * The class supports various SQL operations such as `INSERT`, `SELECT`, `UPDATE`, and `DELETE`.
 * It also offers methods to define query parameters like fields, filters, sorting, limit, related fields, and more.
 * 
 * The `ZTeraDBQuery` class uses additional helper classes and constants, including:
 * - **FilterCondition**: Provides a flexible way to define various filter conditions such as equality, greater than, less than, and more.
 * - **ZTeraDBQueryError**: A custom error handling utility to throw and manage database-related errors.
 * - **FilterTypes**: A set of constants that represent different types of filters that can be applied to queries.
 * 
 * The `ZTeraDBQuery` class allows developers to build dynamic queries in an easy-to-use and programmatically manageable way. It encourages the use of function chaining,
 * where you can define query types (insert, select, update, delete), specify the fields, apply filters, set sorting order, limit the result set, and more, all within
 * a single query builder object. After constructing the query, you can generate the final query object, ready to be executed.
 * 
 * @dependencies
 * - **FilterCondition**: Used to define filter conditions for queries (e.g., equality, greater than, etc.).
 * - **ZTeraDBQueryError**: Custom error class used for handling exceptions and errors in the database query building process.
 * - **FilterTypes**: A collection of constants representing various filter types that can be applied in query conditions (e.g., `EQUAL`, `GT`).
 * 
 * @example
 * // Example usage:
 * // Constructing a SELECT query with filters, fields, and sorting:
 * const query = new ZTeraDBQuery('my_schema', '4U6THGOJKJJEJ3PFJM407QO25F');
 * query.select()
 *      .fields({ field1: 1, field2: 1 })
 *      .filter({ field1: 'value1', field2: 100 })
 *      .sort({ field1: Sort.ASC })
 *      .limit(0, 10)
 *      .generate();
 * 
 * // Constructing an INSERT query:
 * const query = new ZTeraDBQuery('my_schema', '4U6THGOJKJJEJ3PFJM407QO25F');
 * query.insert()
 *      .fields({ field1: 'value1', field2: 'value2' })
 *      .generate();
 * 
 * // Constructing an UPDATE query:
 * const query = new ZTeraDBQuery('my_schema', '4U6THGOJKJJEJ3PFJM407QO25F');
 * query.update()
 *      .fields({ field1: 'new_value1' })
 *      .filter({ field2: 'value2' })
 *      .generate();
 * 
 * @notes
 * - The class provides a method chaining syntax for building complex queries in a structured and readable manner.
 * - It is essential to call the appropriate query type method (`insert()`, `select()`, `update()`, or `delete()`) before generating the query.
 * - Filters are applied to narrow down the data being fetched or modified. Fields and related fields can be specified for SELECT or UPDATE operations.
 * - The sorting functionality allows for ordering the results based on specific fields in either ascending or descending order.
 * - The `limit()` method is used to specify a range of rows for the query result.
 * - The `generate()` method outputs the final query object that can be passed to the database execution engine.
 * 
 * @class       ZTeraDBQuery
 * @package     zteradb.query
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */


import { FilterCondition } from "@zteradb/client/query/zteradb-filter-conditions";
import { ZTeraDBQueryError } from "@zteradb/client/helper/zteradb-exception";
import FilterTypes from "@zteradb/client/constants/zteradb-filter-types";


// Enumeration for different query types (INSERT, SELECT, UPDATE, DELETE)
export const QueryType = Object.freeze({
  INSERT: 0X1,  // Insert operation
  SELECT: 0X2,  // Select operation
  UPDATE: 0X3,  // Update operation
  DELETE: 0X4,  // Delete operation
});

// Enumeration for sorting order (ascending and descending)
export const Sort = Object.freeze({
  ASE: 1, // Ascending order
  DESC: -1, // Descending order
});

// List of properties that should be excluded when processing fields, filters, etc.
const excludeProps = [
  "filterTypesSet",
  "databaseID",
  "schemaName",
  "_queryType",
  "_fields",
  "_filters",
  "_filter_conditions",
  "_sort",
  "_relatedFields",
  "_limit",
  "_count"
];

/**
 * Checks if a given string is a valid schema field name.
 * A valid schema field name can only contain alphanumeric characters (letters and numbers) 
 * and underscores ('_').
 *
 * @param {string} str - The string to be tested.
 * @returns {boolean} - Returns `true` if the string matches the pattern, 
 *                      otherwise returns `false`.
 *
 * @example
 * isValidSchemaField('field_1');  // returns true
 * isValidSchemaField('field#1');  // returns false
 */
export function isValidSchemaField(str) {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(str);
}

/**
 * The ZTeraDBQuery class is designed to construct ZTeraDB database queries step by step.
 * It allows specifying query type (INSERT, SELECT, UPDATE, DELETE), fields, filters, sorting, related fields,
 * limit, and counting, to generate a query object suitable for interacting with a ZTeraDB database.
 * 
 * The class supports method chaining for convenience, enabling fluent API design.
 */
class ZTeraDBQuery {
  // Initialize the main properties of the query
  databaseID = "";     // Database identifier, optional for ZTeraDB connection queries
  schemaName = "";       // Schema name
  _queryType = "";        // Type of the query (INSERT, SELECT, UPDATE, DELETE)
  _fields = {};           // Fields to be selected or affected by the query (e.g., Schema field names)
  _relatedFields = {};   // Related fields (e.g., foreign keys) to be included in the query
  _filters = {};          // Filters or conditions for the query (e.g., WHERE conditions)
  _filter_conditions = [];  // Grouped filters for more complex conditions for the query (e.g., WHERE conditions)
  _limit = [];            // Pagination: Limits the number of results (start, end)
  _sort = {};             // Sorting order for the query (ascending or descending)
  _count = false;         // Flag indicating whether to return the count of records instead of actual records
  filterTypesSet = new Set(Object.values(FilterTypes)); // Set of allowed filter types (e.g., `eq`, `lt`, etc.)

  /**
   * Constructor for creating a new query object.
   * @param {string} schemaName - The name of the schema (required).
   * @param {string} databaseID - The ID of the database (optional) for zteradb.
   * 
   * This constructor initializes the query with the provided schema name and an optional database name.
   */
  constructor(schemaName, databaseID="") { 
     // Validate that schemaName is a non-empty string
     if(typeof schemaName !== "string" || schemaName.trim()==null) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Schema name is required");
    }

    this.schemaName = schemaName; // Set the schemaName value
    if(databaseID) {
      this.databaseID = databaseID // Set the databaseID value
    }
  }

  /**
   * Set the query type to INSERT. Used for inserting new records into the database.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  insert = () => {
    this._queryType = QueryType.INSERT; // Set query type to INSERT
    return this;  // Return the instance for method chaining
  }

  /**
   * Set the query type to SELECT. Used for retrieving data from the database.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  select = () => {
    this._queryType = QueryType.SELECT; // Set query type to SELECT
    return this;  // Return the instance for method chaining
  }

  /**
   * Set the query type to UPDATE. Used for updating existing records in the database.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  update = () => {
    this._queryType = QueryType.UPDATE; // Set query type to UPDATE
    return this;  // Return the instance for method chaining
  }

  /**
   * Set the query type to DELETE. Used for deleting records from the database.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  delete = () => {
    this._queryType = QueryType.DELETE; // Set query type to DELETE
    return this;  // Return the instance for method chaining
  }

  /**
   * Returns this._queryType for the ZTeraDB query
   * @returns _queryType - The query type of the ZTeraDB query
   */
  queryType = () => {
    return this._queryType;
  }

  isSelectQuery = () => {
    return this.queryType() === QueryType.SELECT;
  }

  /**
   * Specify the fields to be selected or affected by the query.
   * @param {object} params - An object containing fields to include in the query.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  fields = ({...params}) => {
    for (let param in params) {
      if(!typeof param === "string" || !isValidSchemaField(param)) {
        throw new ZTeraDBQueryError(`Invalid argument`, -1, `Invalid fields. ${param} must be string`);
      }

      if (["function", "object"].includes(typeof params[param])) {
        throw new ZTeraDBQueryError(`Invalid argument`, -1, `Invalid fields value '${params[param]}'`);
      }
    }

    Object.assign(this, params); 
    return this;  // Return the instance for method chaining
  }

  /**
   * Enable the 'count' mode. The query will return the number of records instead of the actual data.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  count = () => {
    this._count = true; // Set the count flag to true
    return this;  // Return the instance for method chaining
  }

  /**
   * Specify related fields (e.g., foreign keys or other relationships) for the query.
   * @param {object} params - An object containing related fields to include in the query.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  relatedField = ({...params}) => {
    for (let param in params) {
      if(params[param] instanceof Array) {
        let rf_queries = [];
        params[param].forEach(element => {
          rf_queries.push(element.generate());
        });

        this._relatedFields[param] = rf_queries;
      }
      else if(params[param] instanceof ZTeraDBQuery) {
        this._relatedFields[param] = params[param].generate();
      }
    }

    return this;  // Return the instance for method chaining
  }

  /**
   * Specify related fields (e.g., foreign keys or other relationships) for the query.
   * @param {object} params - An object containing related fields to include in the query.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  related_fields = ({...params}) => {
    return this.relatedField(params);
  }

  /**
   * Add a filter group (multiple filters grouped together for complex conditions).
   * @param {filterCondition} FilterCondition - An instance of the FilterCondition class that holds filter conditions.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  filterCondition = (filterCondition) => {
    // Ensure the parameter is an object
    if (!filterCondition instanceof FilterCondition) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid argument: `FilterCondition` must be an instance of FilterCondition");
    }

    this._filter_conditions.push(filterCondition.getFields()); // Add the filter group object
    return this;
  }

  /**
   * Add individual filters (conditions like `field > value`) to the query.
   * @param {object} params - An object containing filter conditions for the query.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  filter = (params) => {
    // Ensure the parameter is an object
    if (typeof params !== 'object' || params === null) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid argument: filter function expects an object");
    }

    // Process each filter parameter
    for (let param in params) {
      if (params[param] === undefined) {
        throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid argument: filter function expects an object");
      }

      if (typeof params[param] === 'object') {
        throw new ZTeraDBQueryError("Invalid argument", -1, `Invalid '${[param]}'. It should not be array, dictionary`);
      }

      this._filters[param] = params[param];
    }

    return this;  // Return the instance for method chaining
  }

  /**
   * Apply sorting to the query results (ascending or descending order).
   * @param {object} params - An object containing the fields and sorting order.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  sort = (params) => {
    // Ensure the parameter is an object
    if (typeof params !== 'object' || params === null) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid argument: sort method expects an object");
    }

    // Process each sort parameter
    for (let param in params) {
      if (params[param] !== Sort.ASE && params[param] !== Sort.DESC) {
        throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid sort argument received");  // Validate sort values
      }

      this._sort[param] = params[param];  // Add sorting to _sort object
    }
    return this;  // Return the instance for method chaining
  }

  /**
   * Apply a limit to the query results for pagination.
   * @param {number} start - The starting index for the limit.
   * @param {number} end - The ending index for the limit.
   * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
   */
  limit = (start, end) => {
    if (!Number.isInteger(start)) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid limit arguments"); // Validate limit arguments
    }

    if (!Number.isInteger(end)) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Invalid limit arguments"); 
    }

    if(start < 0 || end < 0) {
      throw new ZTeraDBQueryError("Invalid argument", -1, "Limit values must be positive integers");  // Ensure limits are non-negative
    }

    this._limit = [start, end]; // Set the limit range
    return this;  // Return the instance for method chaining
  }

  /**
   * Convert the query fields to a dictionary format for easier query construction.
   * @returns {object} - A dictionary of query fields excluding excluded properties.
   */
  fieldsToDict = () => {
    let fields = {};
    for (let field in this) {
      if (!excludeProps.includes(field) && typeof this[field] !== "function") {
        // If the field is an object and has a schemaName, recursively query it
        if (this[field] && typeof this[field] === "object" && this[field].schemaName) {
          fields[field] = this[field].query();
        }
        else {
          fields[field] = this[field];  // Add the field to the dictionary
        }
      }
    }
    
    return fields;  // Return the fields dictionary
  }

  /**
   * Generate the final query object based on the current query configuration.
   * This method validates the required fields and compiles the query into a structured format.
   * @returns {object} - The final query object ready for execution.
   * @throws {Error} - Throws an error if any required fields are missing or invalid.
   */
  query = () => {
    return this.generate();
  }

  /**
   * Generate the final query object based on the current query configuration.
   * This method validates the required fields and compiles the query into a structured format.
   * @returns {object} - The final query object ready for execution.
   * @throws {Error} - Throws an error if any required fields are missing or invalid.
   */
  generate = () => {
    if(!this.schemaName) {
      throw new ZTeraDBQueryError("Query error", -1, "Schema name is required"); // Ensure schemaName is set
    }

    if(!this.queryType()) {
      throw new ZTeraDBQueryError("Query error", -1, "You forgot to call either of select(), insert(), update() or delete() method.")
    }

    // Build the base query object
    let query = {
      db: this.databaseID, // Database name
      sh: this.schemaName, // Schema name
      qt: this.queryType(),  // QueryType
    }

    // Add fields, related fields, filters, etc. to the query
    let fields = this.fieldsToDict();

    if (this._count) query["cnt"] = true;

    if(this.queryType() !== QueryType.DELETE) {
      if (Object.keys(fields).length > 0) query["fl"] = fields;
    }

    if (Object.keys(this._relatedFields).length  > 0) query["rf"] = this._relatedFields;

    if (Object.keys(this._filters).length  > 0) query["fi"] = this._filters;

    if (Object.keys(this._filter_conditions).length  > 0) query["fc"] = this._filter_conditions;

    if (Object.keys(this._sort).length  > 0) query["st"] = this._sort;

    if (Object.keys(this._limit).length  > 0) query["lt"] = this._limit;

    return query; // Return the constructed query object
  }
}

export default ZTeraDBQuery;
