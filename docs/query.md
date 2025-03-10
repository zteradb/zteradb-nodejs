# ZTeraDBQuery
### `ZTeraDBQuery(schemaName: string, databaseName: (string, optional))`

- **Description**: Initializes a new query with the provided `schemaName` (required) and an optional `databaseName`.
- **Parameters**:
  - `schemaName`: (string) The name of the schema. This is a required field.
  - `databaseName`: (string, optional) The name of the database. Default is an empty string. For rest API the databaseName is required field and if the databaseName argument is empty then the query.query() will raise error.

<!-- ## Table of Contents

1. [Overview](#overview)
2. [Constructor](#constructor)
3. [Methods](#methods)
    1. [insert](#insert)
    2. [select](#select)
    3. [update](#update)
    4. [delete](#delete)
    5. [fields](#fieldsparams-field-value)
    6. [relatedFields](#relatedfieldsparams-arrayzteradbquery)
    7. [filterGroup](./filter-condition)
    8. [filter](#filterparams-field-value)
    9. [sort](#sortparams-field-sort)
    10. [limit](#limitstart-number-end-number)
    11. [count](#count)
    12. [generate query](#generate)

--- -->

### Overview

The `ZTeraDBQuery` class provides an intuitive and flexible way to construct queries for a variety of ZTeraDB operations, including **INSERT**, **SELECT**, **UPDATE**, and **DELETE**.

### Key Features:

- **Method Chaining**: Developers can build queries step-by-step, using method chaining for easy configuration of query components.
  
- **Query Customization**: The class allows you to specify key parts of the query, such as:
  - Fields to include or exclude
  - Filters (conditions) for query results
  - Sorting order
  - Limits on the number of results
  - Counting of records
  - Related fields for joins or associations

- **Structured Query Construction**: Query components are organized in a clear, structured way, ensuring that the query is easy to read and modify.

- **Validation**: The class automatically validates required fields and ensures that query parameters are correctly set, reducing the risk of errors.

Once the query is built, you can pass it to the `ZTeraDB Rest API` or `ZTeraDBConnection` object to execute the operation.


### Features:

- **Dynamic Query Creation**: Build queries dynamically using method chaining for easy and flexible configuration.
  
- **Field Selection**: Select specific fields or include all fields in the query results.
  
- **Filter Fields**: Filter fields by specific values, allowing precise query results.

- **Filter Condition**: Use operators like `ZTGT` (greater than), `ZTLT` (less than), `ZTCONTAINS`, and others to apply advanced filtering conditions.

- **Related Field**: Search and retrieve data from related fields (e.g., through joins or associations).

- **Sorting**: Sort results in ascending or descending order.

- **Pagination**: Limit the number of results returned through pagination (using a `limit`).

- **Count Records**: Include a flag to count the total number of records matching the query conditions.

- **Validation**: Automatically ensures that required fields are provided before executing the query, preventing errors.


### Notes
 - The class provides a method chaining syntax for building complex queries in a structured and readable manner.
 - It is essential to call the appropriate query type method (`insert()`, `select()`, `update()`, or `delete()`) before generating the query.
 - Filters are applied to narrow down the data being fetched or modified. Fields and related fields can be specified for SELECT or UPDATE operations.
 - The sorting functionality allows for ordering the results based on specific fields in either ascending or descending order.
 - The `limit()` method is used to specify a range of rows for the query result.
 - The `generate()` method outputs the final ZTeraDB query object that can be passed to the ZTeraDB host execution engine. This method is required only when you are using `ZTeraDB rest API`.


---

# Methods

### Query Type methods
---
  #### `insert()`

  - **Description**: Sets the query type to `INSERT`, enabling the insertion of new records. This method call is necessary for performing insert operations.
  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

  #### `select()`

  - **Description**: Sets the query type to `SELECT`, indicating that the query will retrieve data. This method call is necessary for performing select operations.
  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

  #### `update()`

  - **Description**: Sets the query type to UPDATE, allowing modification of existing records. This method call is necessary for performing update operations.
  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

  #### `delete()`

  - **Description**: Sets the query type to `DELETE`, enabling the removal of records. This method call is necessary for performing delete operations.
  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).


### Query parameters and filter conditions
---

### `fields(params: {field: value})`

- **Description**: This method is required when you need to select, insert, or update specific fields in a query. It allows you to define the field (schema field) and its corresponding value for select, insert, or update operations:
  - For select, set the field value to 1 to include it in the query.
  - For insert, specify the actual value to modify the field.
  - For update, specify the actual value to modify the field.

- **Parameters**:
  - `params`: (object) A dictionary of fields to be included in the query.
    - **example**:
      - **Select**: Retrieve the `name` and `age` of all users from the `users` schema.
      ```js
      const query = new ZTeraDBQuery("user")
        .select()
        .fields({
          name: 1,
          age: 1
        });
      ```
      - **Insert**: Insert a new record into the `user` schema.
      ```js
      const query = new ZTeraDBQuery("user")
        .insert()
        .fields({
          name: "John",
          email: "john@example.com",
          age: 33
        });
      ```
      - **Update**: Update the `name` from 'John' to 'John Doe' where the `email` is 'john@example.com' in the `user` schema.
      ```js
      const query = new ZTeraDBQuery("user")
        .update()
        .fields({
          name: "John Doe",
        })
        .filter({
          email: "john@example.com"
        });
      ```

- **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

- **Note**: The filter value is case-sensitive and will not work in a case-insensitive manner.


### `relatedFields(params: {schema_field: ZTeraDBQuery})`
  - **Description**: This method is necessary only when the schema contains related fields (related schema fields), and you need to select, insert, or update those related fields in the query.

  - **Parameters**:
    - `params`: (object) A dictionary containing the related fields.
      - **example**: Retrieve all orders from the `order` schema where the `order.user.email` (with `order.user` being from the `user` schema) is 'john.doe@example.com'.
        ```js
        const query = new ZTeraDBQuery("orders")
          .relatedFields({
            "user": new ZTeraDBQuery("user")
              .select()
              .filter({
                email: "john.doe@example.com"
              })
          });
        ```
  
  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).


### `filterConditions(filterConditions: FilterConditions)`
  - **Description**: Adds an advanced filter condition to the query.

  - **Parameters**:
    - `filterConditions`: (FilterConditions) An instance of the `FilterConditions` class.
      - **example**: Retrieve all products from the product schema where the quantity of any product is greater than 3.
        ```js
          const query = new ZTeraDBQuery("product")
            .filterConditions(
              ZTGT("quantity", 3)
            );
        ```

  - **Returns**: The `ZTeraDBQuery` instance (supports method chaining).


### `filter(params: {field: value})`

- **Description**: Adds individual filter conditions (e.g., `field = value`) to the query.

- **Parameters**:
  - `params`: (object) A dictionary of filter conditions.
    - **example**: Retrieve the user from the `user` schema where the `name` is 'john' and the `age` is 30.

      ```js
        const query = new ZteraDBQuery("user")
          .filter({
            name: "john",
            age: 30
          });
      ```

- **Returns**: The `ZTeraDBQuery` instance (supports method chaining).


### `sort(params: {field: Sort})`

- **Description**: Applies sorting to the query results based on the specified fields and order (ascending/descending).
- **Parameters**:
  - `params`: (object) A dictionary of fields to sort by and their respective order (ascending or descending).
    - **example**: Retrieve all users from the `user` schema, sorted by `name` in ascending order and `age` in descending order.
      ```js
        const query = new ZteraDBQuery("user")
          .sort({
            name: Sort.ASC,
            age: Sort.DESC
          });
      ```
- **Returns**: The `ZTeraDBQuery` instance (supports method chaining).


### `limit(start: number, end: number)`

- **Description**: Limits the query results to a specific range (for pagination).

- **Parameters**:
  - `start`: (integer) The starting index of the results.
  - `end`: (integer) The ending index of the results.

- **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

- **example**: The following query will return the first 10 users.
    ```js
      const query = new ZteraDBQuery("user")
        .limit(0, 10);
    ```

### `count()`

- **Description**: Switches the query to count mode, returning the number of records rather than the data itself.

- **Returns**: The `ZTeraDBQuery` instance (supports method chaining).

- **example**: The following query will return the total number of users.
    ```js
      const query = new ZTeraDBQuery("user").count();
    ```

### `generate()`

- **Description**: Finalizes the query construction and returns the generated query object. It validates all required fields before returning the final structure.

- **Returns**: (object) The final query object, ready for execution.

- **Throws**:
  - Throws an error if any required fields (like `schema_name` or `queryType`) are missing or invalid.

- **Note**: This method call is essential for retrieving the query and sending it to the ZTeraDB server when using the REST API.
