---
sidebar_position: 5
---

# 🎛️ Filter Conditions

This guide provides a comprehensive breakdown of the functional Abstract Syntax Tree (AST) operators available in ZTeraDB. Use these functional helpers to construct intricate, multi-layered queries that go beyond basic key-value matching.

Every helper function returns a `FilterCondition` instance that must be passed directly into your query builder pipeline:

```javascript
query.filterCondition(condition);
```

---

## 🎯 Categories Overview

ZTeraDB filter functions are organized into four operational layers:
1. **Comparison Operators:** Evaluate mathematical boundaries and set definitions.
2. **Mathematical Evaluators:** Execute calculations inline within database computations.
3. **String Pattern Matching:** Perform case-sensitive and case-insensitive text lookups.
4. **Logical Aggregators:** Nest multiple expressions together using boolean logic.

---

## 1️⃣ Comparison Operators

Comparison operators evaluate fields against scalar values or other operational expressions.

### ZTEQUAL(left, right)
Evaluates if the left expression strictly equals the right expression (a=b).

```javascript
// Check column against scalar value
ZTEQUAL('age', 25);

// Check mathematical resolution against scalar value
ZTEQUAL(ZTMUL(['price', 2]), 100);
```

**SQL Equivalent**

```sql
age = 25;
(price * 2) = 100;
```

---

### ZTGT(expressions)
Evaluates if the first parameter is strictly greater than the second parameter (a>b).

```javascript
ZTGT(['age', 18]);
ZTGT(['price', ZTMUL(['discount', 2])]);
```

**SQL Equivalent**

```sql
ZTGT(['age', 18]);
ZTGT(['price', ZTMUL(['discount', 2])]);
```

---

### ZTGTE(expressions)
Evaluates if the first parameter is greater than or equal to the second parameter (a≥b).

```javascript
ZTGTE(['salary', 40000]);
```

**SQL Equivalent**

```sql
ZTGTE(['salary', 40000]);
```

---

### ZTLT(expressions)
Evaluates if the first parameter is strictly less than the second parameter `(a<b)`.

```javascript
ZTLT(['age', 65]);
```

**SQL Equivalent**

```sql
age < 65;
```

### ZTLTE(expressions)
Evaluates if the first parameter is less than or equal to the second parameter (a≤b).

```javascript
ZTLTE(['rating', 5]);
```

**SQL Equivalent**

```sql
ZTLTE(['rating', 5]);
```

---

### ZTIN(field, values)
Determines if a specified field matches any value within a given literal array.

```javascript
ZTIN('age', [20, 25, 30]);
```

**SQL Equivalent**
```sql
age IN (20, 25, 30);
```

---

# 2️⃣ Mathematical Evaluators

These expressions transform numerical data inline during query resolution before evaluating constraints.

| Function | Argument Type | Operational Action | SQL Equivalent |
| :--- | :--- | :--- | :--- |
| `ZTADD()` | `array $values` | Sums multiple fields or values together ($a + b + c$) | `(field1 + field2)` |
| `ZTSUB()` | `array $values` | Subtracts the second value from the first ($a - b$) | `(field1 - field2)` |
| `ZTMUL()` | `array $values` | Multiplies values together sequentially ($a \times b$) | `(field1 * field2)` |
| `ZTDIV()` | `array $values` | Divides the first value by the second ($a \div b$) | `(field1 / field2)` |
| `ZTMOD()` | `array $values` | Calculates the remainder of a division operation ($a \bmod b$) | `(field1 % field2)` |

### Math-Infused Query Example:
```javascript
// Compiles to: WHERE (price - discount) = 150
const condition = ZTEQUAL(
    ZTSUB(['price', 'discount']), 
    150
);
```

---

## 3️⃣ String Pattern Matching
String operators compile into optimized SQL LIKE syntax patterns. Functions containing an internal I flag (e.g., ZTICONTAINS) apply LOWER() wrappers on data fields to enforce case-insensitive evaluations.

### Substring Search (CONTAINS)
```javascript
// Case-Sensitive
ZTCONTAINS('name', 'Tea'); // WHERE name LIKE '%Tea%'

// Case-Insensitive
ZTICONTAINS('name', 'john'); // WHERE LOWER(name) LIKE '%john%'
```

### Prefix Scan (STARTSWITH)
```javascript
// Case-Sensitive
ZTSTARTSWITH('product_code', 'A-'); // WHERE product_code LIKE 'A-%'

// Case-Insensitive
ZTISTARTSWITH('product_code', 'a-'); // WHERE LOWER(product_code) LIKE 'a-%'
```

Suffix Scan (ENDSWITH)
```javascript
// Case-Sensitive
ZTENDSWITH('email', '.com'); // WHERE email LIKE '%.com'

// Case-Insensitive
ZTIENDSWITH('email', '.COM'); // WHERE LOWER(email) LIKE '%.com'
```

---

## 4️⃣ Logical Aggregators
Logical operators allow you to build deeply nested boolean logic trees by passing arrays of discrete FilterCondition objects.

### ZTAND(conditions)
Combines multiple condition blocks. Every expression within the array must evaluate to true.

```javascript
ZTAND([
    ZTGTE(['age', 18]),
    ZTLT(['age', 30])
]);
```

**SQL Equivalent**
```sql
(age >= 18) AND (age < 30);
```

### ZTOR(conditions)
Evaluates to true if at least one conditional block within the array resolves to true.

```javascript
ZTOR([
    ZTEQUAL('status', 'A'),
    ZTEQUAL('status', 'D')
]);
```

**SQL Equivalent**
```sql
(status = 'A') OR (status = 'D');
```

---

## 🧪 Comprehensive Blueprint Example
The example below demonstrates how to fetch products using complex mathematical evaluations combined with text scans.

### Target Goal:
> "Find all products where the calculation of (price * quantity) > 500 AND the name property contains the word 'wire' (ignoring capitalization mismatch)."

```javascript
import { ZTeraDBQuery } from "zteradb/client"; // Or using commonJS: const { ZTeraDBQuery } = require('zteradb/client');

// 1. Build the functional criteria tree
const filterTree = ZTAND([
    ZTGT([ZTMUL(['price', 'quantity']), 500]),
    ZTICONTAINS('name', 'wire')
]);

// 2. Load the tree context inside the query execution block
const query = new ZTeraDBQuery('product')
    .select()
    .filterCondition(filterTree);
```

Compiled Engine Execution Code:

```sql
SELECT *
FROM product
WHERE (price * quantity) > 500
  AND LOWER(name) LIKE '%wire%';
```

---

## ⚠️ Common Developer Anti-Patterns

* ❌ **Passing Sequential Arguments to Math Blocks:** Writing `ZTSUB('price', 'discount')` causing argument count exceptions.
  * *Fix:* Pass arithmetic operands inside a single parent array: `ZTSUB(['price', 'discount'])`.

* ❌ **Using Math Operators for Structural Filtering Paths:** Utilizing `.filter()` for complex evaluations instead of simple exact key matching.
  * *Fix:* Use simple associative arrays inside `.filter()`. Reserve `.filterCondition()` exclusively for functional expressions and mathematical drivers.

* ❌ **Handling Unoptimized Case Matching Natively:** Manually embedding PHP lower-case string conversion methods within loop evaluation properties.
  * *Fix:* Utilize `ZTICONTAINS`, `ZTISTARTSWITH`, and `ZTIENDSWITH` to perform case-insensitive operations inside the storage engine.

---

### 🎉 Next Step
See these filtering rules applied in complex application environments:  
👉 **[Advanced Query Examples](./query-examples.md)**
