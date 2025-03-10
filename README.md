# ZTeraDB Node.js Client Library
This is a Node.js client library for interacting with **ZTeraDB**, a platform that allows you to connect to your existing databases and query them using **ZTeraDB Query Language (ZQL)**. The client provides an easy-to-use interface to send queries to ZTeraDB and retrieve results in a standardized format.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installing](#install)
4. [Usage](#usage)
5. [Configuration](./docs/config.md)
6. [ZTeraDB Connection](./docs/zteradb-connection.md)
7. [Query](./docs/query.md)
8. [Filter Conditions](./docs/filter-condition.md)


## **Features**

- **Connect to Multiple Databases**: Seamlessly interact with your existing databases through ZTeraDB.
- **ZTeraDB Query Language (ZQL)**: Use a unified query language to query data across different database systems.
- **Easy Integration**: Easily integrate ZTeraDB into your Node.js application.
- **Asynchronous Queries**: Support for async/await syntax to handle queries and results asynchronously.
- **Error Handling**: Comprehensive error handling to help debug and manage database queries.

## **Requirements**
- This is a Node.js module available through the npm registry.
Before installing, download and [install Node.js](https://nodejs.org/en/download/). Node.js 18.20.7 or higher is required.
- If this is a brand new project, make sure to create a package.json first with the [npm init command](https://docs.npmjs.com/creating-a-package-json-file).

## **Install**
Run following command to install ZTeraDB client for nodejs.

```js
// Using npm
# npm install zteradb --save

// Using yarn
# yarn add zteradb
```

## **Usage**
```js
// Import ZTeraDBConnect, ZTeraDBQuery classes 
import {ZTeraDBConnect, ZTeraDBQuery} from 'zteradb';

// Get ZTeraDB Configuration from .env.
const ZTERADB_CONFIG = JSON.parse(process.env.ZTERADB_CONFIG);

// Establish connection with ZTeraDB server
const connection = ZTeraDBConnect(ZTERADB_CONFIG, "db1.zteradb.com", 7777);

// Prepare select query
const query = ZTeraDBQuery("user").select();

// Run the query
const result = connection.run(query);

// Iterate the result
for await (const row of result) {
  console.log("Query result: ", row);
}

// Close the connection
connection.close();

```

## **License**

This project is licensed under the **ZTeraDB** License - see [LICENCE](./LICENCE) file for details.