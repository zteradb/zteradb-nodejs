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
export function isValidSchemaField(str: string): boolean;
export const QueryType: Readonly<{
    INSERT: 1;
    SELECT: 2;
    UPDATE: 3;
    DELETE: 4;
}>;
export const Sort: Readonly<{
    ASE: 1;
    DESC: -1;
}>;
/**
 * The ZTeraDBQuery class is designed to construct ZTeraDB database queries step by step.
 * It allows specifying query type (INSERT, SELECT, UPDATE, DELETE), fields, filters, sorting, related fields,
 * limit, and counting, to generate a query object suitable for interacting with a ZTeraDB database.
 *
 * The class supports method chaining for convenience, enabling fluent API design.
 */
export class ZTeraDBQuery {
    /**
     * Constructor for creating a new query object.
     * @param {string} schemaName - The name of the schema (required).
     * @param {string} databaseID - The ID of the database (optional) for zteradb.
     *
     * This constructor initializes the query with the provided schema name and an optional database name.
     */
    constructor(schemaName: string, databaseID?: string);
    databaseID: string;
    schemaName: string;
    _queryType: string;
    _fields: {};
    _relatedFields: {};
    _filters: {};
    _filter_conditions: any[];
    _limit: any[];
    _sort: {};
    _count: boolean;
    filterTypesSet: Set<"&&" | "||" | "=" | "+" | "-" | "*" | "/" | "%" | ">" | ">=" | "<" | "<=" | "%%" | "i%%" | "^%%" | "^i%%" | "%%$" | "i%%$" | "IN">;
    /**
     * Set the query type to INSERT. Used for inserting new records into the database.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    insert: () => ZTeraDBQuery;
    /**
     * Set the query type to SELECT. Used for retrieving data from the database.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    select: () => ZTeraDBQuery;
    /**
     * Set the query type to UPDATE. Used for updating existing records in the database.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    update: () => ZTeraDBQuery;
    /**
     * Set the query type to DELETE. Used for deleting records from the database.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    delete: () => ZTeraDBQuery;
    /**
     * Returns this._queryType for the ZTeraDB query
     * @returns _queryType - The query type of the ZTeraDB query
     */
    queryType: () => string;
    isSelectQuery: () => boolean;
    /**
     * Specify the fields to be selected or affected by the query.
     * @param {object} params - An object containing fields to include in the query.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    fields: ({ ...params }: object) => ZTeraDBQuery;
    /**
     * Enable the 'count' mode. The query will return the number of records instead of the actual data.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    count: () => ZTeraDBQuery;
    /**
     * Specify related fields (e.g., foreign keys or other relationships) for the query.
     * @param {object} params - An object containing related fields to include in the query.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    relatedField: ({ ...params }: object) => ZTeraDBQuery;
    /**
     * Specify related fields (e.g., foreign keys or other relationships) for the query.
     * @param {object} params - An object containing related fields to include in the query.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    related_fields: ({ ...params }: object) => ZTeraDBQuery;
    /**
     * Add a filter group (multiple filters grouped together for complex conditions).
     * @param {filterCondition} FilterCondition - An instance of the FilterCondition class that holds filter conditions.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    filterCondition: (filterCondition: any) => ZTeraDBQuery;
    /**
     * Add individual filters (conditions like `field > value`) to the query.
     * @param {object} params - An object containing filter conditions for the query.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    filter: (params: object) => ZTeraDBQuery;
    /**
     * Apply sorting to the query results (ascending or descending order).
     * @param {object} params - An object containing the fields and sorting order.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    sort: (params: object) => ZTeraDBQuery;
    /**
     * Apply a limit to the query results for pagination.
     * @param {number} start - The starting index for the limit.
     * @param {number} end - The ending index for the limit.
     * @returns {ZTeraDBQuery} - The instance of the query for method chaining.
     */
    limit: (start: number, end: number) => ZTeraDBQuery;
    /**
     * Convert the query fields to a dictionary format for easier query construction.
     * @returns {object} - A dictionary of query fields excluding excluded properties.
     */
    fieldsToDict: () => object;
    /**
     * Generate the final query object based on the current query configuration.
     * This method validates the required fields and compiles the query into a structured format.
     * @returns {object} - The final query object ready for execution.
     * @throws {Error} - Throws an error if any required fields are missing or invalid.
     */
    query: () => object;
    /**
     * Generate the final query object based on the current query configuration.
     * This method validates the required fields and compiles the query into a structured format.
     * @returns {object} - The final query object ready for execution.
     * @throws {Error} - Throws an error if any required fields are missing or invalid.
     */
    generate: () => object;
}
