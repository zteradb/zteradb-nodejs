---
sidebar_position: 6
---

# 🍳 Query Cookbook

This reference guide provides production-ready code blocks for standard CRUD operations, complex mathematical evaluations, sorting configurations, and pagination pipelines using the ZTeraDB Query Builder.

## 📌 Table of Contents
* [⚙️ Initial Core Setup](#initial-core-setup)
* [1️⃣ Mutation Operators (INSERT)](#1-mutation-operators-insert)
  * [Insert a Single Record](#insert-a-single-record)
* [2️⃣ Retrieval Operators (SELECT)](#2-retrieval-operators-select)
  * [Select All Table Records](#select-all-table-records)
  * [Select with Basic Scalar Filtering](#select-with-basic-scalar-filtering)
  * [Explicit Column Selection](#explicit-column-selection)
  * [Row Window Offsetting (Pagination Boundary)](#row-window-offsetting-pagination-boundary)
* [3️⃣ Advanced Functional Filters](#3-advanced-functional-filters)
  * [Inline Mathematical Validations](#inline-mathematical-validations)
  * [Case-Insensitive Fuzzy Text Matching](#case-insensitive-fuzzy-text-matching)
* [4️⃣ Update & Delete Mutations](#4-update--delete-mutations)
  * [Conditional Record Updates](#conditional-record-updates)
  * [Target Record Hard Erasures](#target-record-hard-erasures)
* [5️⃣ Relational Join Operations](#5-relational-join-operations)
* [6️⃣ Result Set Modifiers](#6-result-set-modifiers)
  * [Ascending Sorting Sequence](#ascending-sorting-sequence)
  * [Multi-Key Compound Sorting](#multi-key-compound-sorting)
  * [Table Matrix Record Counting](#table-matrix-record-counting)
* [🏆 Unified Master Blueprint Example](#unified-master-blueprint-example)
* [🎉 Next Steps](#next-steps)

---

## ⚙️ Initial Core Setup {#initial-core-setup}

Every example below assumes an active, pre-configured `ZTeraDBConnection` lifecycle instance initialized via your global configuration layer:

```javascript
import { ZTeraDBConfig, ZTeraDBConnection, ZTeraDBQuery } from 'zteradb/client';  // Or using commonJS: const { ZTeraDBQuery } = require('zteradb/client');

// Initialize connection via localized runtime environments
const config = new ZTeraDBConfig(JSON.parse(process.env.ZTERADB_CONFIG));
const db = new ZTeraDBConnection(config, 'db1.zteradb.com', 7777);
```

---

## 1️⃣ Mutation Operators (INSERT) {#1-mutation-operators-insert}

### Insert a Single Record
Builds structured data blocks mapping parameters explicitly to target database storage engines.

```javascript
const query = new ZTeraDBQuery('user')
    .insert()
    .fields({
        email: 'john@example.com',
        password: 'hashed_pw',
        status: true
    });

const result = await db.run(query);

console.log('Generated Primary Key ID: ' + result.last_insert_id);
```

**Equivalent SQL**
```sql
INSERT INTO "user" (email, password, status)
VALUES ('john@example.com', 'hashed_pw', TRUE);
```

---

## 2️⃣ Retrieval Operators (SELECT) {#2-retrieval-operators-select}
### Select All Table Records
```javascript
const query = new ZTeraDBQuery('user').select();
const users = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT * FROM "user";
```

### Select with Basic Scalar Filtering
For simple exact-match lookups, pass your payload parameters directly to the .filter() helper method.

```javascript
const query = new ZTeraDBQuery('user')
    .select()
    .filter({ status: true });

const users = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT * FROM "user" WHERE status = TRUE;
```

### Explicit Column Selection
Reduce wire overhead payloads by picking explicitly specified column arrays.

```javascript
const query = new ZTeraDBQuery('user')
    .select()
    .fields({ email: 1 }); // Set field map bit-flags to 1 to inclusion-select

const users = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT email FROM "user";
```

### Row Window Offsetting (Pagination Boundary)
```javascript
const query = new ZTeraDBQuery('user')
    .select()
    .limit(0, 10); // API Mapping: limit(int offset, int count)

const users = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT * FROM "user" LIMIT 10 OFFSET 0;
```

---

## 3️⃣ Advanced Functional Filters {#3-advanced-functional-filters}
For complex conditions that extend beyond standard associative key-value loops, inject pre-compiled filter trees directly into .filterCondition().

### Inline Mathematical Validations
```javascript
// Compiles structural calculation boundary rules
const condition = ZTGT([
    ZTMUL(['price', 'quantity']),
    500
]);

const query = new ZTeraDBQuery('product')
    .select()
    .filterCondition(condition);

const rows = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT * FROM product WHERE (price * quantity) > 500;
```

### Case-Insensitive Fuzzy Text Matching
```javascript
// Utilizing case-insensitive string matcher helpers
const condition = ZTICONTAINS('name', 'john');

const query = new ZTeraDBQuery('user')
    .select()
    .filterCondition(condition);

const rows = await db.run(query);
```

**Equivalent SQL**
```sql
SELECT * FROM "user" WHERE LOWER(name) LIKE '%john%';
```

---

## 4️⃣ Update & Delete Mutations {#4-update--delete-mutations}
### Conditional Record Updates

```javascript
const query = new ZTeraDBQuery('user')
    .update()
    .fields({ status: false })
    .filter({ id: 1 });

const result = await db.run(query);

console.log(result.is_updated ? 'Update Success' : 'No Changes Made');
```

**Equivalent SQL**
```sql
UPDATE "user" SET status = FALSE WHERE id = 1;
```

### Target Record Hard Erasures

```javascript
const query = new ZTeraDBQuery('product')
    .delete()
    .filter({ id: 'PRODUCT_ID' });

const result = await db.run(query);
```

**Equivalent SQL**
```sql
DELETE FROM product WHERE id = 'PRODUCT_ID';
```

---

## 5️⃣ Relational Join Operations {#5-relational-join-operations}
Execute structured data links across foreign key references using nested subquery representations via .relatedFields().

```javascript
const userFilter = new ZTeraDBQuery('user')
    .select()
    .filter({ status: true });

const query = new ZTeraDBQuery('order')
    .select()
    .relatedFields({
        user: userFilter // Maps target collection bindings implicitly 
    });

const rows = await db.run(query);
```

**Equivalent SQL**
```sql
-- Conceptual Engine Join Mapping
SELECT o.*, u.*
FROM "order" o
JOIN "user" u ON o.user_id = u.id
WHERE u.status = TRUE;
```

---

## 6️⃣ Result Set  {#6-result-set-modifiers}
### Ascending Sorting Sequence

```javascript
const query = new ZTeraDBQuery('product')
    .select()
    .sort({ price: 1 }); // 1 signifies Ascending sorting direction
```

**Equivalent SQL**
```sql
SELECT * FROM product ORDER BY price ASC;
```

### Multi-Key Compound Sorting

```javascript
const query = new ZTeraDBQuery('product')
    .select()
    .sort({
        price: 1,    // Ascending
        quantity: -1 // -1 signifies Descending sorting direction
    });
```

**Equivalent SQL**
```sql
SELECT * FROM product ORDER BY price ASC, quantity DESC;
```

### Table Matrix Record Counting
```javascript
const query = new ZTeraDBQuery('product').count();
const result = await db.run(query);

console.log('Active Table Row Count: ' + result.count);
```

**Equivalent SQL**
```sql
SELECT COUNT(*) AS count FROM product;
```

---

## 🏆 Unified Master Blueprint Example {#unified-master-blueprint-example}
The comprehensive blueprint below combines explicit field lookups, complex mathematical operators, exact-match flags, multi-index sorting arrangements, and strict window pagination limitations into a singular processing chain.

```javascript
const { ZTeraDBQuery } = require('zteradb/client'); // Or using ES modules: import { ZTeraDBQuery } from "zteradb/client";

// 1. Build complex condition logic tree
const mathCondition = ZTGT(['quantity', 10]);

// 2. Aggregate the composite processing sequence
const query = new ZTeraDBQuery('product')
    .select()
    .fields({
        name: 1, 
        price: 1, 
        quantity: 1
    })
    .filterCondition(mathCondition)
    .filter({ status: 'A' })
    .sort({ price: 1 })
    .limit(0, 20);

// 3. Execute query statement via storage connection driver
const products = await db.run(query);
```

**Equivalent SQL**
```sql
```

```javascript
```

**Compiled Pipeline Target Output**
```sql
SELECT name, price, quantity
FROM product
WHERE quantity > 10
  AND status = 'A'
ORDER BY price ASC
LIMIT 20 OFFSET 0;
```

### 🎉 Next Steps {#next-steps}
* Learn more about complex filter operators inside the **[Filter Conditions Reference](./filter-condition.md)** matrix.
* Need a quick end-to-end framework test configuration? See our structured **[Quick Start Guide](./quickstart.md)** setup path.
