# ZTeraDB Connection

### `ZTeraDBConnection(ZTeraDBConfig: object, host: string, port: number)`

- **ZTeraDBConfig**: `Object`  
  The configuration object for ZTeraDB. [Click here](./config) for more details.

- **host**: `string`  
  The hostname of the ZTeraDB server instance.  
  **Example**: `"db.zteradb.com"`, `"192.168.1.1"`, `"custom.host.com"`

- **port**: `number`  
  The port number for the ZTeraDB server instance.  
  **Example**: `7777`, `1234`, or any custom port number.

## Overview

This constructor initializes a new `ZTeraDBConnection` instance by providing the necessary ZTeraDB configuration, host, and port.

`ZTeraDBConnection` is a class that abstracts all the complexities of interacting with a ZTeraDB instance, allowing developers to focus solely on running queries and closing the connection. It includes the following features:

1. **Client Authentication**: Automatically handles secure authentication between the client and the ZTeraDB server using token-based mechanisms.

2. **Connection Management**: Manages individual and pooled connections, including retries, timeouts, and error management, ensuring stable communication without developer intervention.

3. **Request Handling**: Automatically handles sending and receiving data (queries and results) to/from the ZTeraDB server over TCP sockets.

4. **Query Execution**: Developers can execute queries by simply using the `ZTeraDBConnection.run(ZTeraDBQuery)` method, passing in a `ZTeraDBQuery` object, without needing to manage the connection or buffering.

5. **Error Handling**: Built-in robust error handling with custom exceptions, covering authentication issues and general connection errors, with no need for the developer to manage these errors.

6. **Connection Pooling**: Connection pooling is handled automatically to ensure that the required number of connections are available for requests, without overloading the server.

After initializing the `ZTeraDBConnection` instance, developers can simply execute queries using the `ZTeraDBConnection.run(ZTeraDBQuery)` method and close the connection with `ZTeraDBConnection.close()`.

If the connection is not explicitly closed, it will be automatically terminated when the process initiated by the developer ends.


## Syntax
```js
  // For more details about the configuration,
  // please refer to the `ZTeraDB Configuration` section.
  import ZTERADB_CONFIG from "./config";

  // Open a connection
  const connection = await ZTeraDBConnection(
    ZTERADB_CONFIG: object,
    "host address": string,
    "port number": number
  );

  // Close the connection
  await connection.close()
```

## Methods

---

### `run(query: ZTeraDBQuery)`
 - **Description**: It executes the query on the ZTeraDB database instance and returns an asynchronous generator containing the query results. If an error occurs, it will return the error instead.
 - **Parameters**:
  - **query**: (ZTeraDBQuery) The ZTeraDBQuery instance.
    - **example**: Below query will fetch all records from product schema.
      ```js
        const query = new ZTeraDBQuery("product")
                        .select();
        const result = connection.run(query); // The result will be async generator.
      ```
      [Detailed Example](#example)

  - **Returns**: async generator

  - **Throws**:
    - Throws an error if any error occurred while running the query.

### `close()`

- **Description**: It closes all active connections to the ZTeraDB server. If the developer does not explicitly close the connection, it will be automatically terminated when the process initiated by the developer ends.

- **Returns**: (boolean) `true` if the connection is successfully closed; an error if any issue occurs while closing the connection.

- **Throws**:
    - Throws an error if any error occurred while closing the connection.

- **example**: [Click here](#example)


## Example:

Below is end to end example for getting all users from the user schema
```js
// Import ZTeraDBConnection, ZTeraDBQuery classes 
import {ZTeraDBConnection, ZTeraDBQuery} from 'zteradb';

// Get ZTeraDB Configuration from .env.
const ZTERADB_CONFIG = JSON.parse(process.env.ZTERADB_CONFIG);

// Establish connection with ZTeraDB server
const connection = await ZTeraDBConnection(ZTERADB_CONFIG, "db1.zteradb.com", 7777);

// Prepare select query
const query = ZTeraDBQuery("user")
              .select();

// Run the query
const result = connection.run(query);

// Iterate the result
for await (const row of result) {
  console.log("Query result: ", row);
}

// Close the connection
await connection.close();

```