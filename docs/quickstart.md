---
sidebar_position: 7
---

# 🚀 Quickstart (10-Minute Beginner Setup)

Welcome to ZTeraDB! This guide is engineered for developers who want to integrate the ZTeraDB NodeJS Client into their applications rapidly. Follow along step-by-step to execute your first database query in under 10 minutes.

## 📌 Table of Contents
* [📋 System Requirements](#system-requirements)
* [📦 1. Installation](#installation)
* [🔐 2. Environment Configuration](#environment-configuration)
* [🔌 3. Establish a Connection Instance](#establish-a-connection-instance)
* [📑 4. Run Your First SELECT Query](#run-your-first-select-query)
* [⚡ 5. Basic CRUD Mutations & Filters](#basic-crud-mutations-filters)
  * [Insert a Record](#insert-a-record)
  * [Update a Record](#update-a-record)
  * [Delete a Record](#delete-a-record)
  * [Simple Scalar Filtering](#simple-scalar-filtering)
  * [Advanced Functional Filtering](#advanced-functional-filtering)
* [🎉 6. Next Steps](#next-steps)

---

## 📋 System Requirements {#system-requirements}

| Requirement | Specification |
| :--- | :--- |
| **Node.js Version** | Node.js 18.20.7 or higher (Download from [nodejs.org](https://nodejs.org)) |
| **Knowledge Base** | Familiarity with asynchronous JavaScript (Promises / Async-Await) |
| **Credentials** | ZTeraDB account with active clientKeys |

---

## <a id="installation"></a>📦 1. Installation

### Option 1: Via npm (Recommended)
Run the following command in your terminal to install the ZTeraDB client:

```sh
npm install zteradb
```

### Option 2: Via Yarn
Alternatively, you can pull the package using yarn:

```bash
yarn add zteradb
```

---

## <a id="environment-configuration"></a>🔐 2. Environment Configuration
Create an isolated environment configuration file named .env inside your structural root folder path to safely externalize pipeline security variables.

```bash
# .env
CLIENT_KEY="your_client_identity_string"
ACCESS_KEY="your_active_access_token"
SECRET_KEY="your_cryptographic_signature_key"
DATABASE_ID="your_cluster_instance_id"

ZTERADB_HOST=<Your ZTeraDB Server HOST>
ZTERADB_PORT=<Your ZTeraDB Server PORT>
ZTERADB_ENV=DEV
```

⚠️ Production Security Watch: Never commit your localized .env variables into public source control networks. Add .env explicitly into your project's .gitignore rules.

---

## <a id="establish-a-connection-instance"></a> 🔌 3. Establish a Connection Instance
Create a reusable connection gateway file named db.js to initialize and return your storage cluster instance wrapper.

```javascript
// db.js

import { ZTeraDBConfig, ZTeraDBConnection, ResponseDataTypes, ENVS } from 'zteradb/client'; // Or using commonJS: const { ZTeraDBConfig, ZTeraDBConnection, ResponseDataTypes, ENVS } = require('zteradb/client');

/**
 * Initializes and returns a singleton-style ZTeraDB Connection instance.
 *
 * @returns {ZTeraDBConnection}
 */
function getDB() {
    const config = new ZTeraDBConfig({
        client_key: process.env.CLIENT_KEY,
        access_key: process.env.ACCESS_KEY,
        secret_key: process.env.SECRET_KEY,
        database_id: process.env.DATABASE_ID,
        env: ENVS.DEV,
        response_data_type: ResponseDataTypes.JSON
    });

    return new ZTeraDBConnection(
        process.env.ZTERADB_HOST,
        parseInt(process.env.ZTERADB_PORT, 10),
        config
    );
}

module.exports = { getDB };
```

---

## <a id="run-your-first-select-query"></a>📑 4. Run Your First SELECT Query
Create an execution file named test.js to fetch table data out of your live database node matrix.

```javascript
// test.js

const { getDB } = require('./db');
const { ZTeraDBQuery } = require('zteradb/client'); // Or using commonJS: const { ZTeraDBQuery } = require('zteradb/client');

async function run() {
    // 1. Establish data storage connection engine driver
    const db = getDB();

    // 2. Build the query extraction tree
    const query = new ZTeraDBQuery('user').select();

    // 3. Process execution against cluster nodes
    const result = await db.run(query);

    // 4. Clean-print response row arrays
    for (const row of result) {
        console.log(row);
    }

    // 5. Explicitly terminate network handle resources
    await db.close();
}

run().catch(console.error);
```

Execute the test runtime sequence inside your CLI environment:

```bash
node test.js
```

🎉 If execution logic routing configuration matches your credentials, active user matrices rows will output directly to your terminal screen.

---

## <a id="basic-crud-mutations-filters"></a>⚡ 5. Basic CRUD Mutations & Filters
Below is an onboarding list containing structured code snippets for typical mutations, conditional writes, and filter configurations.

### Insert a Record

```javascript
const query = new ZTeraDBQuery('user')
    .insert()
    .fields({
        email: 'test@example.com',
        password: 'secure_hashed_password',
        status: true
    });

const result = await db.run(query);
console.log('Generated Auto-Increment ID: ' + result.last_insert_id);
```

### Update a Record

```javascript
const query = new ZTeraDBQuery('user')
    .update()
    .fields({ status: false })
    .filter({ id: 1 });

const result = await db.run(query);
```

### Delete a Record
```javascript
const query = new ZTeraDBQuery('user')
    .delete()
    .filter({ id: 5 });

const result = await db.run(query);
```

### Simple Scalar Filtering
For straightforward exact-matches on properties, pass static key-value configurations inside the .filter() assignment helper.

```javascript
const query = new ZTeraDBQuery('user')
    .select()
    .filter({ status: true });
```

### Advanced Functional Filtering
For processing compound mathematical operations or parsing programmatic dynamic validations at database runtime level, load logic trees into .filterCondition().

```javascript
// Compiles operational math evaluating: (price * quantity) > 500
const query = new ZTeraDBQuery('product')
    .select()
    .filterCondition(
        ZTGT([
            ZTMUL(['price', 'quantity']),
            500
        ])
    );
```

---

## <a id="next-steps"></a>🎉 6. Next Steps

You are officially setup! You have successfully managed your dependency assembly installation layer, connected to database endpoints, managed query statements, and mapped out simple filters.

👉 **Up Next:** If you encounter environment blockades or configuration exceptions, consult the comprehensive **[Troubleshooting Guide](./troubleshooting.md)** blueprint.
