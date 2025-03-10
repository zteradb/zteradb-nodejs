/**
 * @file ZTeraDBQuery Test Suite
 * @description
 * This test suite is designed to validate the functionality of the ZTeraDBQuery class (or a similar query-building system).
 * The tests focus on ensuring that queries are constructed correctly and handle edge cases, errors, and various query operations.
 * This includes the handling of `SELECT`, `INSERT`, `UPDATE`, and `DELETE` queries with different configurations such as 
 * dynamic field names, filters, sorting, limits, and error handling.
 * 
 * The suite also ensures that the query builder can process various complex cases, including:
 * - Dynamic and static field names
 * - Complex filters (e.g., arrays, ranges, operators like IN, greater than, less than, etc.)
 * - Query method chaining (e.g., select -> filter -> sort -> limit)
 * - Large query sets (e.g., 1000 fields, filters, etc.)
 * - Proper error handling for missing or invalid inputs
 * 
 * This suite should be run to validate that:
 * 1. All queries are constructed and executed properly.
 * 2. Errors are correctly thrown when invalid queries or inputs are encountered.
 * 3. The query builder can handle large or complex datasets efficiently.
 * 
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 * 
 * @note: This test suite is intended for unit testing purposes. It uses a mock or a dummy version of the ZTeraDBQuery
 * class, where actual database interaction is simulated for testing purposes.
 * 
 * @dependencies
 * - Jest: A JavaScript testing framework used to run and manage the test cases.
 * - ZTeraDBQuery: The class being tested.
 * 
 * @example
 * ```js
 * // Running the test suite
 * $ npm test
 * ```
 */
// Import necessary modules and types
import ZTeraDBQuery, {QueryType, Sort} from "../src/lib/zteradb-query";
import { ZTeraDBException } from "../src/index";

describe('ZTeraDBQuery', () => {
  let query; // Declare a variable to hold the instance of ZTeraDBQuery

  // Setup before each test case: Create a new instance of ZTeraDBQuery with a sample schema name
  beforeEach(() => {
    query = new ZTeraDBQuery('my_schema_hash', 'database_id');
  });

  /**
   * Test case for the SELECT query type (`select()` method).
   * This test checks that the query type is correctly set to `SELECT` when the `select()` method is called on the `query` object.
   * Specifically, it ensures that after calling the `select()` method, the `queryType()` method returns `QueryType.SELECT`.
   */
  test('should set query type to SELECT', () => {
    // Testing if the query type is correctly set to SELECT when the select method is called on the query object.
    
    query.select();  // Call the select method to set the query type.
    
    // Expecting the queryType() method to return QueryType.SELECT after calling select()
    expect(query.queryType()).toBe(QueryType.SELECT);
  });

  /**
   * Test case for the INSERT query type (`insert()` method).
   * This test checks that the query type is correctly set to `INSERT` when the `insert()` method is called on the `query` object.
   * Specifically, it ensures that after calling the `insert()` method, the `queryType()` method returns `QueryType.INSERT`.
   */
  test('should set query type to INSERT', () => {
    // Testing if the query type is correctly set to INSERT when the insert method is called on the query object.
    
    query.insert();  // Call the insert method to set the query type.
    
    // Expecting the queryType() method to return QueryType.INSERT after calling insert()
    expect(query.queryType()).toBe(QueryType.INSERT);
  });

  /**
   * Test case for the UPDATE query type (`update()` method).
   * This test checks that the query type is correctly set to `UPDATE` when the `update()` method is called on the `query` object.
   * Specifically, it ensures that after calling the `update()` method, the `queryType()` method returns `QueryType.UPDATE`.
   */
  test('should set query type to UPDATE', () => {
    // Testing if the query type is correctly set to UPDATE when the update method is called on the query object.
    
    query.update();  // Call the update method to set the query type.
    
    // Expecting the queryType() method to return QueryType.UPDATE after calling update()
    expect(query.queryType()).toBe(QueryType.UPDATE);
  });

  /**
   * Test case for the DELETE query type (`delete()` method).
   * This test checks that the query type is correctly set to `DELETE` when the `delete()` method is called on the `query` object.
   * Specifically, it ensures that after calling the `delete()` method, the `queryType()` method returns `QueryType.DELETE`.
   */
  test('should set query type to DELETE', () => {
    // Testing if the query type is correctly set to DELETE when the delete method is called on the query object.
    
    query.delete();  // Call the delete method to set the query type.
    
    // Expecting the queryType() method to return QueryType.DELETE after calling delete()
    expect(query.queryType()).toBe(QueryType.DELETE);
  });

  /**
   * Test case for setting fields in a query (`fields()` method).
   * This test checks that the `fields()` method correctly sets the fields and their values in the query object.
   * Specifically, it ensures that after calling the `fields()` method with a set of fields, the `fieldsToDict()` method returns the correct field dictionary.
   */
  test('should set fields correctly', () => {
    // Setting fields with values for the query object.
    query.fields({ field1: 1, field2: 1 });

    // Expecting the fieldsToDict() method to return the correct dictionary with the set fields.
    expect(query.fieldsToDict()).toEqual({ field1: 1, field2: 1 });
  });

  /**
   * Test case for correctly setting fields using the `fields()` method.
   * This test checks that the `fields()` method correctly assigns multiple fields to the query object.
   * Specifically, it ensures that after calling `fields()` with a set of fields, the `fieldsToDict()` method returns the correct field dictionary with the expected values.
   */
  test('should correctly set fields with fields() method', () => {
    // Set fields field1 and field2 with respective values 1 and 2.
    query.fields({ field1: 1, field2: 2 });

    // Expecting the fieldsToDict() method to return the correct dictionary with the fields set above.
    expect(query.fieldsToDict()).toEqual({ field1: 1, field2: 2 });
  });

  /**
   * Test case for handling invalid usage of the `fields()` method.
   * This test ensures that an error is thrown when the `fields()` method is called without any arguments.
   * Specifically, it verifies that calling `fields()` without passing an argument triggers an error.
   */
  test('should throw error when fields() is called without arguments', () => {
    // Expecting an error to be thrown when the `fields()` method is called without any arguments.
    expect(() => query.fields()).toThrow();
  });

  /**
   * Test case for setting filters using the `filter()` method.
   * This test checks that the `filter()` method correctly sets the filters for the query.
   * Specifically, it verifies that calling `filter()` with a field and value applies the filter correctly.
   */
  test('should set filters correctly', () => {
    // Apply filter with field1 = 'value'
    query.filter({ field1: 'value' });

    // Verify that the filter was correctly set
    expect(query._filters).toEqual({ field1: 'value' });
  });

  /**
   * Test case for setting filters with an empty object using the `filter()` method.
   * This test ensures that when an empty object is passed to the `filter()` method,
   * the internal `_filters` property is set to an empty object as expected.
   */
  test('should set filters to empty object when filter() is called with empty object', () => {
    // Apply filter with an empty object
    query.filter({});

    // Verify that the filters property is set to an empty object
    expect(query._filters).toEqual({});
  });

  /**
   * Test case for setting sort order using the `sort()` method.
   * This test ensures that the `sort()` method correctly applies ascending and descending sort orders
   * for fields, and verifies that the internal `_sort` property is updated accordingly.
   */
  test('should set sort order correctly', () => {
    // Apply ascending sort for field1
    query.sort({ field1: 1 });

    // Verify that the sort order for field1 is set to ascending
    expect(query._sort).toEqual({ field1: Sort.ASE });

    // Apply descending sort for field2
    query.sort({ field2: -1 });

    // Verify that the sort order for field1 remains ascending and for field2 is set to descending
    expect(query._sort).toEqual({ field1: Sort.ASE, field2: Sort.DESC });
  });

  /**
   * Test case for setting the limit using the `limit()` method.
   * This test ensures that the `limit()` method correctly sets the limit and offset values
   * and verifies that the internal `_limit` property is updated accordingly.
   */
  test('should set limit correctly', () => {
    // Set limit with offset 5 and limit 10 rows
    query.limit(5, 10);

    // Verify that the internal _limit property is correctly set to [5, 10]
    expect(query._limit).toEqual([5, 10]);
  });

  /**
   * Test case for generating the correct query object using chained methods.
   * This test ensures that when multiple query methods (`select()`, `fields()`, `filter()`, `sort()`, and `limit()`) are chained together,
   * the `generate()` method produces a correctly structured query object with the expected properties.
   */
  test('should generate correct query object', () => {
    // Chain multiple methods to build a query
    query.select()
      .fields({ field1: 1 })  // Select field1
      .filter({ field1: 'value' })  // Apply filter on field1
      .sort({ field1: 1 })  // Sort by field1 in ascending order
      .limit(0, 10);  // Set limit to start at offset 0 and return 10 rows

    // Generate the final query object
    const result = query.generate();

    // Verify that the generated query object matches the expected format
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
      db: 'database_id',  // schema name
      sh: 'my_schema_hash',  // schema name
      qt: QueryType.SELECT,  // Query type set to SELECT
      fl: { field1: 1 },  // Fields
      fi: { field1: 'value' },  // Filters
      st: { field1: Sort.ASE },  // Sort order
      lt: [0, 10]  // Limit
    }));
  });

  /**
   * Test case for throwing an error when the schema name is not set.
   * This test checks that an error is correctly thrown if the schema name is not provided when attempting to generate a query.
   * Specifically, it ensures that a `ZTeraDBQueryError` is thrown with the message "Schema name is required" when the schema name is missing.
   */
  test('should throw error if schema name is not set', () => {
    // Attempt to create a new ZTeraDBQuery instance without a schema name and generate the query
    expect(() => new ZTeraDBQuery().generate())
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Schema name is required");  // Verify that the correct error is thrown
  });

  /**
   * Test case for throwing an error when the query type is not set.
   * This test checks that an error is correctly thrown if the query type is not set before attempting to generate a query.
   * Specifically, it ensures that a `ZTeraDBQueryError` is thrown when the query type (e.g., SELECT, INSERT, UPDATE, DELETE) is missing.
   */
  test('should throw error if query type is not set', () => {
    // Attempt to generate a query without setting a query type
    expect(() => query.generate())
      .toThrow(ZTeraDBException.ZTeraDBQueryError);  // Verify that the correct error is thrown
  });

  /**
   * Test case for setting fields correctly in a SELECT query.
   * This test ensures that the `fields()` method correctly sets the fields for a SELECT query.
   * Specifically, it checks if the `fieldsToDict()` method returns the fields as expected after calling `fields()`.
   */
  test('should set fields correctly for SELECT', () => {
    // Setting fields for a SELECT query
    query.select().fields({ field1: 1, field2: 1 });

    // Verifying that the fields were set correctly by checking the fieldsToDict method
    expect(query.fieldsToDict()).toEqual({ field1: 1, field2: 1 }); 
  });

  /**
   * Test case for setting fields correctly in an INSERT query.
   * This test ensures that the `fields()` method correctly sets the fields for an INSERT query.
   * Specifically, it checks if the `fieldsToDict()` method returns the fields as expected after calling `fields()`.
   */
  test('should set fields correctly for INSERT', () => {
    // Setting fields for an INSERT query
    query.insert().fields({ field1: 'value1', field2: 'value2' });

    // Verifying that the fields were set correctly by checking the fieldsToDict method
    expect(query.fieldsToDict()).toEqual({ field1: 'value1', field2: 'value2' }); 
  });

  /**
   * Test case for setting fields correctly in an UPDATE query.
   * This test ensures that the `fields()` method correctly sets the fields for an UPDATE query.
   * Specifically, it checks if the `fieldsToDict()` method returns the fields as expected after calling `fields()`.
   */
  test('should set fields correctly for UPDATE', () => {
    // Setting fields for an UPDATE query
    query.update().fields({ field1: 'new_value', field2: 'new_value' });

    // Verifying that the fields were set correctly by checking the fieldsToDict method
    expect(query.fieldsToDict()).toEqual({ field1: 'new_value', field2: 'new_value' });
  });

  /**
   * Test case for setting filters correctly in a DELETE query.
   * This test ensures that the `filter()` method correctly sets the filters for a DELETE query.
   * Specifically, it checks if the internal `_filters` property holds the correct filter values after calling `filter()`.
   */
  test('should set filters correctly for DELETE', () => {
    // Setting filters for a DELETE query
    query.delete().filter({ field1: 'value1' });

    // Verifying that the filters were set correctly by checking the internal _filters property
    expect(query._filters).toEqual({ field1: 'value1' });
  });

  /**
   * Test case for setting a limit of 10 results in a SELECT query.
   * This test ensures that the `limit()` method correctly sets the limit for a SELECT query.
   * Specifically, it checks if the `_limit` property holds the correct range (offset, count) after calling `limit()`.
   */
  test('should set limit of 10 results for SELECT', () => {
    // Setting a limit of 10 results with an offset of 0 for the SELECT query
    query.select().limit(0, 10);

    // Verifying that the limit is set correctly by checking the internal _limit property
    expect(query._limit).toEqual([0, 10]);
  });

  /**
   * Test case for setting a limit of 0 results in a SELECT query.
   * This test ensures that the `limit()` method correctly handles a limit of 0 results for a SELECT query.
   * Specifically, it checks if the `_limit` property holds the correct range (offset, count) when both are set to 0.
   */
  test('should set limit to 0 results for SELECT', () => {
    // Setting a limit of 0 results with an offset of 0 for the SELECT query
    query.select().limit(0, 0);

    // Verifying that the limit is set correctly by checking the internal _limit property
    expect(query._limit).toEqual([0, 0]);
  });

  /**
   * Test case for setting a limit of 1000 results with an offset of 5000 in a SELECT query.
   * This test ensures that the `limit()` method correctly handles a limit of 1000 results and an offset of 5000 for a SELECT query.
   * Specifically, it checks if the `_limit` property holds the correct range (offset, count) when set with these values.
   */
  test('should set limit to 1000 results for SELECT', () => {
    // Setting a limit of 1000 results with an offset of 5000 for the SELECT query
    query.select().limit(1000, 5000);

    // Verifying that the limit is set correctly by checking the internal _limit property
    expect(query._limit).toEqual([1000, 5000]);
  });

  /**
   * Test case for setting a descending sort order on a field for a SELECT query.
   * This test ensures that the `sort()` method correctly sets a descending sort order when the argument `-1` is passed.
   * Specifically, it checks if the internal `_sort` property correctly reflects the descending order for the specified field.
   */
  test('should set descending sort order for SELECT', () => {
    // Setting a descending sort order for field1 in a SELECT query
    query.select().sort({ field1: -1 });

    // Verifying that the internal _sort property correctly reflects the descending sort order
    expect(query._sort).toEqual({ field1: Sort.DESC });
  });

  /**
   * Test case for setting multiple sort orders for a SELECT query.
   * This test ensures that the `sort()` method can handle and correctly apply multiple sort orders for different fields.
   * Specifically, it checks if the sort order for multiple fields is set correctly—ascending for `field1` and descending for `field2`.
   */
  test('should set multiple sort orders for SELECT', () => {
    // Setting multiple sort orders: ascending for field1 and descending for field2
    query.select().sort({ field1: 1, field2: -1 });

    // Verifying that the internal _sort property correctly reflects the multiple sort orders
    expect(query._sort).toEqual({ field1: Sort.ASE, field2: Sort.DESC });
  });

  /**
   * Test case for handling an empty sort object for a SELECT query.
   * This test ensures that when an empty sort object is provided to the `sort()` method, 
   * it doesn't modify the internal `_sort` property and correctly remains an empty object.
   */
  test('should handle empty sort object for SELECT', () => {
    // Calling sort() with an empty object to test how it handles the absence of sorting parameters
    query.select().sort({});

    // Verifying that the internal _sort property remains empty when an empty sort object is passed
    expect(query._sort).toEqual({});
  });

  /**
   * Test case for setting both ascending and descending sort orders in a SELECT query.
   * This test ensures that the `sort()` method correctly handles both ascending (1) and descending (-1) sort orders for fields.
   * Specifically, it verifies that the correct sort order is applied for each field in the query.
   */
  test('should set ascending and descending sorts', () => {
    // Calling sort() to set ascending order for field1 and descending order for field2
    query.select().sort({ field1: 1, field2: -1 });

    // Verifying that field1 is sorted in ascending order and field2 in descending order
    expect(query._sort).toEqual({ field1: Sort.ASE, field2: Sort.DESC });
  });

  /**
   * Test case for applying multiple `limit()` calls in sequence.
   * This test ensures that when multiple `limit()` calls are made on a query, the last one applied is used.
   * Specifically, it verifies that the second `limit()` call overrides the first one and applies the new limit values.
   */
  test('should apply multiple limit calls', () => {
    // Calling limit() twice: the first one with [0, 10], and the second one with [10, 20]
    query.select().limit(0, 10).limit(10, 20);

    // Verifying that the final limit is set to [10, 20] after both limit() calls
    expect(query._limit).toEqual([10, 20]);
  });

  /**
   * Test case for handling invalid negative limit values in a query.
   * This test ensures that when negative values are passed to the `limit()` method, an error is thrown.
   * Specifically, it verifies that the query builder correctly handles invalid limit values and throws the appropriate error with the expected message.
   */
  test('should not accept negative limit values', () => {
    // Attempting to apply negative limit values [-1, -5], which is invalid
    expect(() => query.select().limit(-1, -5)).toThrow(ZTeraDBException.ZTeraDBQueryError, "Limit values must be positive integers");
  });

  /**
   * Test case for handling invalid limit argument types in a query.
   * This test ensures that when invalid argument types (e.g., strings) are passed to the `limit()` method, an error is thrown.
   * Specifically, it verifies that the query builder correctly identifies invalid argument types and throws the appropriate error with the expected message.
   */
  test('should not accept invalid limit argument types', () => {
    // Attempting to pass invalid argument types ('invalid', 'value') to the limit method, which should raise an error
    expect(() => query.limit('invalid', 'value')).toThrow(ZTeraDBException.ZTeraDBQueryError, 'Invalid limit arguments');
  });

  /**
   * Test case for applying multiple filters in a SELECT query.
   * This test ensures that multiple filters can be correctly applied to a query and are stored in the appropriate internal property.
   * Specifically, it verifies that when multiple filters are provided, they are properly set in the query builder and returned as expected.
   */
  test('should apply multiple filters for SELECT', () => {
    // Applying multiple filters to the SELECT query
    query.select().filter({ field1: 'value1', field2: 'value2' });

    // Verifying that the filters are correctly set in the internal _filters property
    expect(query._filters).toEqual({ field1: 'value1', field2: 'value2' });
  });

  /**
   * Test case for handling nested object fields in an INSERT query.
   * This test ensures that nested object fields are correctly handled when setting fields for an INSERT operation.
   * Specifically, it verifies that when a nested object is passed as a field, the query builder stores and returns the field in the expected format.
   */
  test('should handle nested object fields for INSERT', () => {
    // Setting a field with a nested object for the INSERT query
    // Verifying that the nested object is correctly set in the query's fields
    expect(() => query.insert().fields({ field1: { nestedField: 'value' } }).fieldsToDict()).toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid argument");
  });

  /**
   * Test case for dynamically assigning field names in a SELECT query.
   * This test checks if dynamic field names can be correctly assigned and processed when setting fields for a SELECT query.
   * Specifically, it ensures that a field name, when determined at runtime (using a variable), is correctly set and stored in the query builder.
   */
  test('should dynamically assign field names', () => {
    // Defining a dynamic field name
    const key = 'dynamicField'; 

    // Preparing the SELECT query with a dynamic field name using computed property syntax
    query.select().fields({ [key]: 1 });

    // Verifying that the dynamic field name is correctly set in the query's fields
    expect(query.fieldsToDict()).toEqual({ [key]: 1 });
  });

  /**
   * Test case for handling complex filters in a SELECT query.
   * This test ensures that complex filters, such as arrays and range operators, are correctly handled and raises errors when invalid filter formats are provided.
   * Specifically, it checks that fields with arrays and range operators (like `gt` or `$gt`) are processed properly, and errors are thrown when they are used incorrectly.
   */
  test('should handle complex filters for SELECT', () => {
    // Testing if an invalid filter with an array for 'field1' and a range operator ('gt') for 'field2' is rejected
    expect(() => query.select().filter({ field1: ['value1', 'value2'], field2: { gt: 10 } }))
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field1'. It should not be array, dictionary");

    // Testing if an invalid filter with a valid value for 'field1' but an incorrect range operator format for 'field2' is rejected
    expect(() => query.select().filter({ field1: 'value2', field2: { gt: 10 } }))
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field2'. It should not be array, dictionary");

    // Testing if an invalid filter with an array for 'field1' and a valid range operator ('$gt') for 'field2' is rejected
    expect(() => query.select().filter({ field1: ['value1', 'value2'], field2: { $gt: 10 } }))
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field1'. It should not be array, dictionary");
  });

  /**
   * Test case for ensuring method chaining works correctly.
   * This test checks if multiple query methods can be chained together in sequence (i.e., `select()`, `fields()`, `filter()`, `limit()`, `sort()`).
   * Specifically, it verifies that the query builder maintains the correct state after chaining multiple methods.
   */
  test('should chain methods correctly', () => {
    // Chaining methods to build a SELECT query
    query.select()
      .fields({ field1: 1 })  // Set fields for the SELECT query
      .filter({ field2: 'value' })  // Apply filter for field2
      .limit(0, 10)  // Set limit with offset 0 and limit 10 results
      .sort({ field1: 1 });  // Apply ascending sort for field1

    // Verify that the query type is set to SELECT after chaining methods
    expect(query._queryType).toBe(QueryType.SELECT);  // Expecting the query type to be SELECT after chaining all methods
  });

  /**
   * Test case for handling DELETE queries with complex filters.
   * This test ensures that DELETE queries do not accept complex filters (e.g., filters with operators like `$in`).
   * Specifically, it checks if the query builder throws an error when a complex filter is applied to a DELETE query.
   */
  test('should handle DELETE with complex filters', () => {
    // Testing if DELETE queries can handle complex filters (like $in operator)
    expect(() => query.delete().filter({ field1: { $in: ['value1', 'value2'] } }))
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field1'. It should not be array, dictionary");  // Expecting the complex filter to throw an error
  });

  /**
   * Test case for handling UPDATE queries with nested filters.
   * This test ensures that UPDATE queries do not accept filters that involve nested objects (e.g., using comparison operators like `lt`).
   * Specifically, it checks if the query builder throws an error when a nested filter is applied to an UPDATE query.
   */
  test('should handle UPDATE with nested filters', () => {
    // Testing if UPDATE queries can handle nested filters
    expect(() => query.update().fields({ field1: 'new_value' }).filter({ field2: { lt: 100 } }))
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field2'. It should not be array, dictionary");  // Expecting the filter to throw an error
  });

  /**
   * Test case for handling INSERT queries with null fields.
   * This test ensures that null values can be correctly assigned to fields in an INSERT query.
   * Specifically, it verifies that when a field is assigned a null value, it is correctly reflected in the generated query.
   */
  test('should handle INSERT with null fields', () => {
    // Testing if null fields are handled correctly for an INSERT query
    // Verifying that the null value is correctly reflected in the query
    expect(() => query.insert().fields({ field1: null }).fieldsToDict()).toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid fields value 'null'"); // Expecting the field to be set to null
  });

  /**
   * Test case for handling array filters in a SELECT query.
   * This test ensures that array filters are not allowed and are correctly flagged as errors.
   * Specifically, it verifies that when an array is used as a filter value, an error is thrown.
   */
  test('should handle array filters for SELECT', () => {
    // Testing if array filters are correctly handled for a SELECT query
    expect(() => query.select().filter({ field1: ['value1', 'value2'] }))  // Trying to set an array filter for field1
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field1'. It should not be array, dictionary");  // Expecting an error to be thrown due to invalid filter
  });

  /**
   * Test case for handling range filters in a SELECT query.
   * This test ensures that range filters (like `gte` and `lte`) are not allowed and are correctly flagged as errors.
   * Specifically, it verifies that when a range filter is applied (using operators like `gte` and `lte`), an error is thrown.
   */
  test('should handle range filters for SELECT', () => {
    // Testing if range filters are correctly handled for a SELECT query
    expect(() => query.select().filter({ field1: { gte: 10, lte: 20 } }))  // Trying to set a range filter for field1
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid 'field1'. It should not be array, dictionary");  // Expecting an error to be thrown due to invalid range filter
  });

  /**
   * Test case for handling empty queries.
   * This test ensures that an error is thrown when a query is generated without calling any of the query methods (`select()`, `insert()`, `update()`, or `delete()`).
   * Specifically, it verifies that if no query type is set, the system throws an appropriate error indicating that a query method must be called first.
   */
  test('should throw error for empty query', () => {
    // Attempting to generate an empty query without calling any query method
    expect(() => query.generate()) 
      .toThrow(ZTeraDBException.ZTeraDBQueryError, "You forgot to call either of select(), insert(), update() or delete() method."); // Expecting an error that informs the user to call one of the query methods first
  });

  /**
   * Test case for handling null schema name in query.
   * This test ensures that an error is thrown when a query is created with a `null` schema name.
   * Specifically, it verifies that when the schema name is null, the system throws an appropriate error indicating that the schema name is required.
   */
  test('should throw error with null schema name', () => {
    // Attempting to create a query with a null schema name
    expect(() => new ZTeraDBQuery(null)) 
      .toThrow(ZTeraDBException.ZTeraDBQueryError, 'Schema name is required');  // Expecting an error to be thrown with a message indicating the schema name is required
  });

  /**
   * Test case for handling SELECT queries with non-existent fields.
   * This test ensures that when a SELECT query is constructed with a non-existent field, it does not cause any errors and the field is handled gracefully.
   * Specifically, it verifies that the non-existent field is accepted and included in the query without any issues.
   */
  test('should handle SELECT with non-existent field', () => {
    // Constructing a SELECT query with a non-existent field
    query.select().fields({ nonExistentField: 1 });

    // Verifying that the query does not throw any errors and that the non-existent field is included correctly
    expect(query.fieldsToDict()).toEqual({ nonExistentField: 1 }); // Expecting the non-existent field to be handled and returned correctly without errors
  });

  /**
   * Test case for handling INSERT queries with invalid field types.
   * This test ensures that when an invalid field type (e.g., a function) is provided for an INSERT query, an error is thrown.
   * Specifically, it checks that the system correctly identifies and handles invalid argument types, such as functions, when setting field values.
   */
  test('should throw error for INSERT with invalid field type (function)', () => {
    // Attempting to insert a field with an invalid value (function) as a field value
    expect(() => query.insert().fields({ field1: () => {} })).toThrow(ZTeraDBException.ZTeraDBQueryError, 'Invalid argument'); // Expecting the error to be thrown due to invalid field type (function)
  });

  /**
   * Test case for handling invalid filter format in an UPDATE query.
   * This test ensures that when an invalid filter format (e.g., a non-object) is used in an UPDATE query, an error is thrown.
   * Specifically, it checks that the system correctly identifies and handles incorrect filter formats, such as non-object values.
   */
  test('should throw error for invalid filter format in UPDATE', () => {
    // Attempting to apply an invalid filter format (string) for an UPDATE query
    expect(() => query.update().filter('invalid')).toThrow(ZTeraDBException.ZTeraDBQueryError, 'Invalid argument: filter function expects an object'); // Expecting the error to be thrown due to invalid filter format (non-object)
  });
  
  /**
   * Test case for handling invalid filter operators in a SELECT query.
   * This test ensures that when an invalid filter operator is used, an error is thrown.
   * Specifically, it checks that the system properly identifies unsupported or invalid filter operators.
   */
  test('should throw error for invalid filter operator', () => {
    // Attempting to apply a filter with an unsupported or invalid operator (`invalidOp`) for a SELECT query
    expect(() => query.select().filter({ field1: { invalidOp: 'value' } })).toThrow('Invalid argument'); // Expecting the error to be thrown due to invalid filter operator
  });

  /**
   * Test case for handling missing schema name in query generation.
   * This test ensures that when the schema name is not provided, an error is thrown.
   * Specifically, it checks that the system properly validates the presence of the schema name
   * before attempting to generate a query.
   */
  test('should throw error when schema name is missing', () => {
    // Attempting to generate a query without providing a schema name
    expect(() => new ZTeraDBQuery().generate()).toThrow(ZTeraDBException.ZTeraDBQueryError, 'Schema name is required'); // Expecting the error to be thrown due to missing schema name
  });

  /**
   * Test case for handling empty fields and filters in a SELECT query.
   * This test checks if empty fields and filters are handled correctly when provided.
   * Specifically, it ensures that when empty objects are passed for fields and filters,
   * the resulting query does not include those empty properties.
   */
  test('should handle empty fields and filters', () => {
    // Testing if empty fields and filters are handled correctly for a SELECT query
    query.select().fields({}).filter({}); // Providing empty objects for fields and filters
    
    const result = query.generate();   // Generate the query object
    
    // Expecting that the result does not include empty fields and filters
    expect(result.fl).toEqual(undefined);  // Expecting no fields to be included in the query
    expect(result.fi).toEqual(undefined);  // Expecting no filters to be included in the query
  });

  /**
   * Test case for handling DELETE with an invalid filter format.
   * This test ensures that an error is thrown when an invalid filter format (not an object) is passed in a DELETE query.
   * Specifically, it verifies that the system correctly handles and throws an error if the `filter` method 
   * is called with a non-object argument.
   */
  test('should handle DELETE with invalid filter format', () => {
    // Testing if an error is thrown for an invalid filter format in a DELETE query
    expect(() => query.delete().filter('invalid')).toThrow(
      ZTeraDBException.ZTeraDBQueryError,  // The error type that should be thrown
      'Invalid argument: filter function expects an object'  // The expected error message
    );
  });

  /**
   * Test case for handling invalid limit format.
   * This test ensures that an error is thrown when invalid arguments are passed to the `limit` method.
   * Specifically, it verifies that the system correctly handles and throws an error when the `limit` method
   * is called with non-numeric values or arguments of an incorrect type.
   */
  test('should handle invalid limit format', () => {
    // Testing if an error is thrown for invalid limit arguments
    expect(() => query.limit('invalid', 'value')).toThrow(
      ZTeraDBException.ZTeraDBQueryError,  // The error type that should be thrown
      'Invalid limit arguments'  // The expected error message
    );
  });

  /**
   * Test case for handling a large number of fields (1000 fields).
   * This test checks that the `fields()` method can handle a large number of fields being dynamically assigned.
   * Specifically, it verifies that when 1000 fields are generated and passed to the `select()` query, 
   * they are correctly assigned, and the query can handle them efficiently.
   */
  test('should handle large number of fields (1000 fields)', () => {
    const largeFields = {};

    // Generate 1000 fields dynamically and assign them a value of 1
    for (let i = 0; i < 1000; i++) {
      largeFields[`field${i}`] = 1;
    }

    // Set the generated fields for a SELECT query
    query.select().fields(largeFields);
    
    // Generate the final query object
    const result = query.generate();

    // Verify that the fields have been set correctly (length should be 1000)
    expect(Object.keys(result.fl)).toHaveLength(1000);
  });

  /**
   * Test case for handling a large number of filters (1000 filters).
   * This test checks that the `filter()` method can handle a large number of filters being dynamically assigned.
   * Specifically, it verifies that when 1000 filters are generated and passed to the `select()` query, 
   * they are correctly applied, and the query can handle them efficiently.
   */
  test('should handle large number of filters for SELECT', () => {
    const filters = {};

    // Generate 1000 filters dynamically, assigning values to each field
    for (let i = 0; i < 1000; i++) {
      filters[`field${i}`] = `value${i}`;
    }

    // Set the generated filters for a SELECT query
    query.select().filter(filters);
    
    // Generate the final query object
    const result = query.generate();

    // Verify that the filters match the generated filters
    expect(result.fi).toEqual(filters);
  });

  /**
   * Test case for handling large limit values in a `SELECT` query.
   * This test checks that the `limit()` method can handle very large limit values being passed to the query.
   * Specifically, it ensures that when a large limit range (from 0 to 1,000,000) is set, the query correctly stores the limit values.
   */
  test('should handle large limit values for SELECT', () => {
    // Set a very large limit for the SELECT query (from 0 to 1,000,000)
    query.select().limit(0, 1000000);

    // Verify that the limit is correctly set to [0, 1000000]
    expect(query._limit).toEqual([0, 1000000]);
  });

  /**
   * Test case for validating limit values in a `SELECT` query.
   * This test checks that negative limit values are not accepted by the query builder.
   * Specifically, it ensures that when negative values are passed to the `limit()` method, an error is thrown with a message indicating that limit values must be positive integers.
   */
  test('should not accept negative limit values', () => {
    // Test if negative limit values throw an error for the `limit()` method.

    // Negative limit value for offset
    expect(() => query.select().limit(-1, 5)).toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid argument");

    // Negative limit value for rows
    expect(() => query.select().limit(1, -5)).toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid argument");

    // Both limit and offset are negative
    expect(() => query.select().limit(-1, -5)).toThrow(ZTeraDBException.ZTeraDBQueryError, "Invalid argument");
  });

  /**
   * Test case for handling invalid filter operators in a `SELECT` query.
   * This test checks that an error is thrown when an invalid filter operator is used.
   * Specifically, it ensures that if a filter is provided with an operator that is not recognized (such as `$unknownOp`),
   * the query builder throws a `ZTeraDBQueryError` with a message indicating that the argument is invalid.
   */
  test('should handle invalid operator in SELECT filter', () => {
    // Test if an invalid operator in the filter throws an error with the correct exception
    expect(() => query.select().filter({ field1: { $unknownOp: 'value' } })).toThrow(ZTeraDBException.ZTeraDBQueryError, 'Invalid argument');
  });

  /**
   * Test case for handling special characters in field names.
   * This test checks that an error is thrown when a field name contains special characters.
   * Specifically, it ensures that if a field name is provided with special characters (such as `@`, `#`, etc.),
   * the query builder throws a `ZTeraDBQueryError` with a message indicating that the argument is invalid.
   */
  test('should not allow special characters in field names', () => {
    // Test if a field name with special characters throws an error with the correct exception
    expect(() => query.select().fields({ 'field@#1': 1 })).toThrow(
      ZTeraDBException.ZTeraDBQueryError,  // Expected exception type
      'Invalid argument'  // Expected error message when special characters are in the field name
    );
  });

  /**
   * Test case for handling a DELETE query with an empty filter array.
   * This test ensures that when an empty filter array is provided to the `filter()` method,
   * the query builder handles it correctly by setting the filters to an empty object.
   * Specifically, it verifies that an empty array passed to the `filter()` method is converted
   * to an empty object, as filters should be represented as an object rather than an array.
   */
  test('should handle DELETE query with empty filter array', () => {
    // Test if an empty filter array is handled correctly for a DELETE query
    query.delete().filter([]);  // Set an empty filter array for a DELETE query
    
    // Verify that the filters have been set to an empty object
    expect(query._filters).toEqual({});  // Filters should be an empty object, not an array
  });

  /**
   * Test case for handling a SELECT query with an empty filter but non-empty fields.
   * This test ensures that when a `SELECT` query is executed with valid fields and an empty filter,
   * the query builder correctly handles the fields while not applying any filters.
   * Specifically, it verifies that the fields are returned as expected, and the absence of filters
   * doesn't interfere with the field settings.
   */
  test('should handle SELECT query with empty filter but non-empty fields', () => {
    // Test if a SELECT query with non-empty fields but an empty filter works correctly
    expect(query.select().fields({ field1: 1 }).fieldsToDict()).toEqual({ field1: 1 });  // Verify that only the fields are returned, and filters are empty
  });

  /**
   * Test case for handling combined SELECT query with multiple limit and sort calls.
   * This test verifies the behavior of a `SELECT` query when multiple limits and sort orders are applied.
   * Specifically, it checks that the query correctly applies the final sort and limit after multiple method calls.
   * The test ensures that only the last applied limit and sort order are considered.
   */
  test('should handle combined SELECT with multiple limits and sorts', () => {
    // Set a SELECT query with both sorting and multiple limit calls
    query.select().sort({ field1: 1 }).limit(0, 10).limit(10, 20);
    
    // Verify that the final sort order is applied (ascending for 'field1')
    expect(query._sort).toEqual({ field1: Sort.ASE });  

    // Verify that the final limit is applied (starting from 10 to 20)
    expect(query._limit).toEqual([10, 20]);
  });
});