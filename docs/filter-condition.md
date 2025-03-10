# ZTeraDB Filter Complex Condition Functions
Filter condition functions enable the creation of complex filter conditions. These functions support various operations, including multiplication, addition, equality checks, logical operations like `AND`, `OR`, `>`, `<`, `>=`, `<=`, `in`, and string operations like `contains`, `starts with`, `ends with`. Errors are triggered when invalid parameters or missing values are encountered.


## Table of Contents
1. [Equal filter](#ztequalkey-value)
2. [Addition Filter](#ztaddparams-array)
3. [Substraction Filter](#ztsubparams-array)
4. [Multiplication Filter](#ztmulparams-array)
5. [Division Filter](#ztdivdividend-divisor)
6. [Modulo Filter](#ztmoddividend-divisor)
7. [Filed in Array Filter](#ztinfield-string-values-array)
8. [String Contains Filter](#ztcontainsfield-string-value-string)
9. [String Case-insensitive contains Filter](#zticontainsfield-string-value-string)
10. [String Starts with Filter](#ztstartswithfield-string-value-string)
11. [String Case-insensitive Starts with Filter](#ztistartswithfield-string-value-string)
12. [String Ends with Filter](#ztendswithfield-string-value-string)
13. [String Case-insensitive Ends with Filter](#ztiendswithfield-string-value-string)
14. [Greater than Filter](#ztgtvalues-array)
15. [Greater than or equal to Filter](#ztgtevalues-array)
16. [Less than Filter](#ztltvalues-array)
17. [Less than or equal to Filter](#ztltevalues-array)
18. [AND Filter](#ztandfilters-array)
19. [OR Filter](#ztorfilters-array)


### `ZTEQUAL(key, value)`
- **Description**: The `ZTEQUAL` function applies an equality filter to compare the `key` (left side) and `value` (right side) arguments, then returns a new `FilterConditions` instance. This `FilterConditions` will later be used to build and execute a query. You can combine this filter with other filters to create more complex queries.

- **Parameters**:
  - `key` (Any): The field (or expression) to be compared on the left side of the equation.
    - **Value**: A constants.
    - **Field**: Schema field.
    - **FilterConditions**: any ZT* function.

    - **Example**: A field name (e.g., `"age"`) or an expression (e.g., `ZTMUL("price", 2)` which multiplies the "price" field by 2).
    - **Usage**: You can use any valid field or expression that you want to compare.
  
  - `value` (Any): The value (or expression) to be compared to the `key` on the right side of the equation.
    - **Value**: A constants.
    - **Field**: Schema field.
    - **FilterConditions**: Any ZT* function.

    - **Example**: A field value (e.g., `30` or `"active"`) or an expression (e.g., `ZTMUL("quantity", 5)`).
    - **Usage**: This is the value or result of an expression that you want to compare against the `key`.

- **Returns**: 
  - **`FilterConditions`**: A new instance of `FilterConditions` with the equality filter applied. This `FilterConditions` will be passed as an argument to `ZTeraDBQuery.filterCondition()` or other functions that support filter conditions, allowing you to apply your filter to a query.

- **Throws**: 
  - **`ZTeraDBError`**: If invalid parameters are passed (e.g., the `key` or `value` is missing or of an incorrect type), the function will throw an error.

- **Use Case**:
  - Use `ZTEQUAL` when you need to find records based on a comparison between two fields or between a field and a specific value.
  - **Example Use Case**: To find all users with an "age" equal to 30, you can write: `ZTEQUAL('age', 30)`. Or to check if a field’s value is equal to another field’s calculated value, like `ZTEQUAL(ZTMUL('price', 2), 100)`, where you compare twice the price to 100.

### Example

```javascript
import { ZTeraDBQuery, ZTMUL, ZTEQUAL } from "zteradb";

// Example 1: Simple equality check
const filterConditions = ZTEQUAL("age", 30); 
// This checks if the "age" field is equal to 30

// Generate the query.
const query = ZTeraDBQuery("users")
  .select()
  .filterCondition(FilterConditions);
// This query fetches all users where age is 30

// Example 2: Using expressions in the equality filter
const filterCondition2 = ZTEQUAL(ZTMUL("price", 2), 100);
// This checks if 2 times the value of "price" equals 100

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
// This query fetches all products where "price * 2" equals 100


// Example 3: Suppose you have a table called "product" with the fields "name", "price", and "quantity".
// To retrieve all products where the name is "Tea", you can use the following approach:

// Apply the equality filter on the 'name' field to check if it matches "Tea"
FilterConditions = ZTEQUAL('name', 'Tea');  // Interpreted as name = 'Tea'

// Generate the query.
const query3 = ZTeraDBQuery("product")
  .select() // We want to select all fields by default
  .filterCondition(FilterConditions); // Attach the filter conditions to the query      

// The query will now fetch all products from the "product" table where the "name" is "Tea"
```

---

### `ZTADD(params: Array)`
- **Description**: The `ZTADD` function creates a addition filter for the values provided in the `params` array. It returns a new `FilterConditions` instance that can be used later to build and execute a query. This filter is often used in combination with other filters, such as `ZTEQUAL`, to create more complex queries.
- **Parameters**:
  - `params` (Array): An array of values, fields, or filter conditions (any ZT* function) to addition. The addition can occur between:
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* functions.

    - **Example**: `["price", "discount"]` (price + discount) or `[200, "price"]` (price + 200). here price, discount are schema fields.

- **Returns**:
  - A new `FilterConditions` instance with the addition filter applied. This can later be used in query-building methods like `ZTeraDBQuery.filterCondition()`.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported combinations of fields or data types.

- **Use Case**:
  - Use `ZTSUB` when you need to filter records based on the difference between two fields, a field and a constant, or even between ZT* functions. You can combine `ZTSUB` with other filters (e.g., `ZTEQUAL`) to match the subtraction result against another field or constant.

  - **Example**: Subtract the `discount` from `price` and check if the result equals a specific value using `ZTSUB` and `ZTEQUAL`.

- **Note**:
  - Based on your use case, you pass n number of fields / values / FilterConditions to add with each other.

### Example:

```javascript
import { ZTeraDBQuery, ZTSUB, ZTEQUAL } from "zteradb";

// Example 1: Subtract two fields - "price" and "discount"
const filterConditions = ZTEQUAL(ZTADD(["price", "discount"]), 150);
// This checks if price + discount equals 150

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Subtract a constant from a field
const filterCondition2 = ZTEQUAL(ZTADD(["price", 200]), 50);
// This checks if price + 200 equals 50

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
```

---


### `ZTSUB(params: Array)`
- **Description**: The `ZTSUB` function creates a subtraction filter for the values provided in the `params` array. It returns a new `FilterConditions` instance that can be used later to build and execute a query. This filter is often used in combination with other filters, such as `ZTEQUAL`, to create more complex queries.
  
- **Parameters**:
  - `params` (Array): An array of values, fields, or any ZT* functions to subtract. The subtraction can occur between:
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* functions.

    - **Example**: `["price", "discount"]` (price - discount) or `[200, "price"]` (200 - price). here price, discount are schema fields.
  
- **Returns**: 
  - Based on your use case, you pass n number of fields / values / ZT* functions to substract from each other.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported combinations of fields or data types.

- **Use Case**:
  - Use `ZTSUB` when you need to filter records based on the difference between two fields, a field and a constant, or even between filter conditions. You can combine `ZTSUB` with other filters (e.g., `ZTEQUAL`) to match the subtraction result against another field or constant.

  - **Example**: Subtract the `discount` from `price` and check if the result equals a specific value using `ZTSUB` and `ZTEQUAL`.

- **Note**:
  - if you pass n number of fields / values / ZT* functions to substract from each other. 


### Example:

```javascript
import { ZTeraDBQuery, ZTSUB, ZTEQUAL } from "zteradb";

// Example 1: Subtract two fields - "price" and "discount"
const filterConditions = ZTEQUAL(ZTSUB(["price", "discount"]), 150);
// This checks if price - discount equals 150

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Subtract a constant from a field
const filterCondition2 = ZTEQUAL(ZTSUB(["price", 200]), 50);
// This checks if price - 200 equals 50

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
```

---


### `ZTMUL(params: Array)`
- **Description**: The `ZTMUL` function creates a multiplication filter for the values provided in the `params` array. It returns a new `FilterConditions` instance that can later be used in query-building, often in combination with other filters like `ZTEQUAL`.
  
- **Parameters**:
  - `params` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "quantity"]` or `[2, 5]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.
  
- **Returns**:
  - A new `FilterConditions` instance with the multiplication filter applied. This can be used as part of a query to filter records based on the result of the multiplication.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTMUL` when you need to filter records based on the product of two or more fields, or a combination of fields and constants.

### Example:

```javascript
import { ZTeraDBQuery, ZTMUL, ZTEQUAL } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTEQUAL(ZTMUL(["price", "quantity"]), 10000);
// This checks if price * quantity equals 10,000

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTEQUAL(ZTMUL([2, "price"]), 100);
// This checks if 2 times the price equals 100

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
```

---

### `ZTDIV(dividend, divisor)`
- **Description**: Applies a division filter to dividend and divisor and returns a new `FilterConditions` instance which will be later used to prepare the filter conditions query. It will be used with some other combination.

- **Parameters**:
  - `dividend` (any): The divisor can be a constant, schema field, or any filter conditions (ZT* function).
    - **Value**: A constant.
    - **Field**: A schema field.
    - **FilterConditions**: A ZT* function.

  - `divisor` (any): The divisor can be a constant, schema field, or any filter conditions (ZT* function).
    - **Value**: A constant.
    - **Field**: A schema field.
    - **FilterConditions**: A ZT* function.

- **Returns**:
  - A new `FilterConditions` instance with the division filter applied. This can be used as part of a query to filter records based on the result of the division.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - If you need to find records based on the division of two schema fields or values, and the result must match a specific field's value or a constant, you can use the ZTDIV filter in conjunction with the ZTEQUAL function.

- **Example**:

```javascript
import { ZTeraDBQuery, ZTDIV, ZTEQUAL } from "zteradb";

// Example 1: Divide two fields - "price" and "quantity"
const filterConditions = ZTEQUAL(ZTDIV(["price", "quantity"]), 10000);
// This checks if price / quantity equals 10,000

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Divide a constant and a field
const filterCondition2 = ZTEQUAL(ZTDIV("price", 2), 100);
// This checks if the price dived by 2 equals 100

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

```

---

### `ZTMOD(dividend, divisor)`
- **Description**: Applies a modulo filter to dividend and divisor and returns a new `FilterConditions` instance which will be later used to prepare the filter conditions query. It will be used with some other combination.

- **Parameters**:
  - `dividend` (any): The divisor can be a constant, schema field, or any filter conditions (ZT* function).
    - **Value**: A constant.
    - **Field**: A schema field.
    - **FilterConditions**: A ZT* function.

  - `divisor` (any): The divisor can be a constant, schema field, or any filter conditions (ZT* function).
    - **Value**: A constant.
    - **Field**: A schema field.
    - **FilterConditions**: A ZT* function.

- **Returns**:
  - A new `FilterConditions` instance with the modulo filter applied. This can be used as part of a query to filter records based on the result of the modulo.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - If you need to find records based on the modulo of two schema fields or values, and the result must match a specific field's value or a constant, you can use the ZTMOD filter in conjunction with the ZTEQUAL, ZTLT, ZTGT, etc functions.

- **Example**:

```javascript
import { ZTeraDBQuery, ZTMOD, ZTEQUAL, ZTGT } from "zteradb";

// Example 1: Modulo two fields - "price" and "discount"
const filterConditions = ZTEQUAL(ZTMOD(["price", "discount"]), 1);
// This checks if price % discount equals 1

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// ... pass the query to connection.run() method.

// Example 2: Modulo a constant and a field
const filterCondition2 = ZTGT(ZTMOD("price", 21), 18);
// This checks if the (price % 21) > 18

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

// ... pass the query2 to connection.run() method.
```

---


### `ZTIN(field: string, values: Array)`
- **Description**: Applies a schema field in filter to the values and returns a new `FilterConditions` instance which will be later used to prepare the filter conditions query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `values` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "quantity"]` or `[2, 5]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.

- **Returns**:
  - A new `FilterConditions` instance with the `in` filter applied. This can be used as part of a query to filter records.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records based on a combination of schema fields and constants.

- **Example**:

```javascript
import { ZTeraDBQuery, ZTIN } from "zteradb";

// Example 1: Check age fall in 20 or 30
const filterCondition = ZTIN("age", [20, 30])

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

```

---

### `ZTCONTAINS(field: string, value: string)`
- **Description**: The `ZTICONTAINS` function is used to find a case-sensitive substring within a schema field's data. It returns a new `FilterConditions` instance that can later be used to build the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `like` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value appears anywhere within the schema field's data.

- **Example**:

```javascript
import { ZTeraDBQuery, ZTCONTAINS } from "zteradb";

// Example 1: Case-sensitive search for product names containing the letter "a"
const filterConditions = ZTCONTAINS("product_name", "a");

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTICONTAINS(field: string, value: string)`
- **Description**: The `ZTICONTAINS` function is used to find a case-insensitive substring within a schema field's data. It returns a new `FilterConditions` instance that can later be used to build the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `ilike` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value appears anywhere within the schema field's data.

- **Example**:

```javascript
import { ZTeraDBQuery, ZTICONTAINS } from "zteradb";

// Example 1: Case-insensitive search for product names containing the letter "a"
const filterConditions = ZTICONTAINS("product_name", "a");

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTSTARTSWITH(field: string, value: string)`
- **Description**: The `ZTSTARTSWITH` function is used to find records where a schema field's data starts with a specific, case-sensitive substring. It returns a new `FilterConditions` instance that can later be used to construct the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `like` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value case-sensitively starts with a specific substring in the schema field's data.

### Example:

```javascript
import { ZTeraDBQuery, ZTSTARTSWITH } from "zteradb";

// Example 1: Case-sensitive search for product names starts with the letter "a"
const filterConditions = ZTSTARTSWITH("product_name", "a");

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTISTARTSWITH(field: string, value: string)`
- **Description**: The `ZTISTARTSWITH` function is used to find records where a schema field's data starts with a specific, case-insensitive substring. It returns a new `FilterConditions` instance that can later be used to construct the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `ilike` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value case-insensitively starts with a specific substring in the schema field's data.

### Example:

```javascript
import { ZTeraDBQuery, ZTISTARTSWITH } from "zteradb";

// Example 1: Case-sensitive search for product names starts with the letter "a"
const filterConditions = ZTISTARTSWITH("product_name", "a");

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTENDSWITH(field: string, value: string)`
- **Description**: The `ZTENDSWITH` function is used to find records where a schema field's data ends with a specific, case-sensitive substring. It returns a new `FilterConditions` instance that can later be used to construct the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `like` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value case-sensitively ends with a specific substring in the schema field's data.

### Example:

```javascript
import { ZTeraDBQuery, ZTENDSWITH } from "zteradb";

// Example 1: Case-sensitive search for product names starts with the letter "a"
const filterConditions = ZTENDSWITH("product_name", "a");
// filters all products where product_name starts with "a"

const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTIENDSWITH(field: string, value: string)`
- **Description**: The `ZTIENDSWITH` function is used to find records where a schema field's data ends with a specific, case-insensitive substring. It returns a new `FilterConditions` instance that can later be used to construct the filter query.
- **Parameters**:
  - `field` (string): The field is schema field name.
  - `value` (string): A substring contained within the value of a schema field.

- **Returns**:
  - A new `FilterConditions` instance with the `ilike` filter applied to the filter.

- **Throws**:
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - To find records where the value case-insensitively ends with a specific substring in the schema field's data.

### Example:

```javascript
import { ZTeraDBQuery, ZTIENDSWITH } from "zteradb";

// Example 1: Case-insensitive search for product names ends with the letter "a"
const filterConditions = ZTIENDSWITH("product_name", "a");

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);
```

---

### `ZTGT(values: Array)`
- **Description**: The ZTGT function generates a "greater than" filter for the values provided in the values array. It returns a new FilterConditions instance that can be utilized later in query construction. Additionally, this function supports the BETWEEN AND query, enabling you to filter schema fields within a specific range.
  
- **Parameters**:
  - `values` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "quantity"]` or `[2, 5]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.
  
- **Returns**:
  - A new `FilterConditions` instance with the greater than filter applied. This can be used as part of a query to filter records based on the result of the greater than.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTGT` when you need to filter records based on the greater than of two or more fields, or a combination of fields and constants.

### Example:

```javascript
import { ZTeraDBQuery, ZTGT, ZTMUL } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTGT(["price", "discount"]);
// This checks if price > discount

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTGT([100, "price", 200]);
// This checks if 100 > price > 200.

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

// Example 2: Multiply a constant and a field
const filterConditions3 = = ZTGT(["price", ZTMUL("discount", 2)]);
// This checks if price > (discount * 2).

// Generate the query.
const query3 = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions3);
```

---

### `ZTGTE(values: Array)`
- **Description**: The ZTGTE function generates a "greater than or equal to" filter for the values provided in the values array. It returns a new FilterConditions instance that can be utilized later in query construction. Additionally, this function supports the BETWEEN AND query, enabling you to filter schema fields within a specific range.
  
- **Parameters**:
  - `values` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "discount"]` or `[200, price, 500]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.
  
- **Returns**:
  - A new `FilterConditions` instance with the greater than or equal to filter applied. This can be used as part of a query to filter records based on the result of the greater than.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTGTE` when you need to filter records based on the greater than or equal to of two or more fields, or a combination of fields and constants.

### Example:

```javascript
import { ZTeraDBQuery, ZTGTE, ZTMUL } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTGTE(["price", "discount"]);
// This checks if price >= discount

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTGTE([100, "price", 200]);
// This checks if 100 >= price >= 200.

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

// Example 2: Multiply a constant and a field
const filterConditions3 = = ZTGTE(["price", ZTMUL("discount", 2)]);
// This checks if price >= (discount * 2).

// Generate the query.
const query3 = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions3);
```

---


### `ZTLT(values: Array)`
- **Description**: The ZTLT function generates a "less than" filter for the values provided in the values array. It returns a new FilterConditions instance that can be utilized later in query construction. Additionally, this function supports the BETWEEN AND query, enabling you to filter schema fields within a specific range.
  
- **Parameters**:
  - `values` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "quantity"]` or `[2, 5]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.
  
- **Returns**:
  - A new `FilterConditions` instance with the less than filter applied. This can be used as part of a query to filter records based on the result of the less than.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTLT` when you need to filter records based on the less than of two or more fields, or a combination of fields and constants.

### Example:

```javascript
import { ZTeraDBQuery, ZTLT, ZTMUL } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTLT(["price", "discount"]);
// This checks if price < discount

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTLT([100, "price", 200]);
// This checks if 100 < price < 200.

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

// Example 2: Multiply a constant and a field
const filterConditions3 = = ZTLT(["price", ZTMUL("discount", 2)]);
// This checks if price < (discount * 2).

// Generate the query.
const query3 = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions3);
```

---

### `ZTLTE(values: Array)`
- **Description**: The `ZTLTE` function generates a "less than or equal to" filter for the values provided in the values array. It returns a new FilterConditions instance that can be utilized later in query construction. Additionally, this function supports the BETWEEN AND query, enabling you to filter schema fields within a specific range.
  
- **Parameters**:
  - `values` (Array): An array of values, fields, or any ZT* functions to multiply together.
    - **Values**: Array of constants.
    - **Fields**: Array of schema fields.
    - **FilterConditions**: Array of ZT* functions.
    - **Field, Value, FilterConditions**: A combination of array of schema field, constant, and ZT* function.

    - **Example**: `["price", "discount"]` or `[200, price, 500]` or `[ZTSUB("price", "discount"), 10]`. The price, quantity and discount are schema fields.
  
- **Returns**:
  - A new `FilterConditions` instance with the less than or equal to filter applied. This can be used as part of a query to filter records based on the result of the less than.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTLTE` when you need to filter records based on the less than or equal to of two or more fields, or a combination of fields and constants.

### Example:

```javascript
import { ZTeraDBQuery, ZTLTE, ZTMUL } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTLTE(["price", "discount"]);
// This checks if price <= discount

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTLTE([100, "price", 200]);
// This checks if 100 <= price <= 200.

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);

// Example 2: Multiply a constant and a field
const filterConditions3 = = ZTLTE(["price", ZTMUL("discount", 2)]);
// This checks if price <= (discount * 2).

// Generate the query.
const query3 = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions3);
```

---

### `ZTAND(filters: Array)`
- **Description**: The `ZTAND` function creates an `AND` filter using the filters provided in the `filters` array. It returns a new `FilterConditions` instance, which can be used later in query construction. This function is especially useful when you need to retrieve records that satisfy both conditions.
  
- **Parameters**:
  - `filters` (Array): An array of filter conditions to be combined with an AND operator.
    - **FilterConditions**: Array of ZT* functions.

    - **Example**: `ZTEQUAL("product_name", "xyz")` or `ZTGT([200, price, 500])` or `ZTEQUAL(ZTSUB("price", "discount"), 10)`. `product_name` and `price` are fields in the schema.
  
- **Returns**:
  - A new `FilterConditions` instance with the `AND` operator applied to the filters.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTAND` when you need to filter records based on multiple conditions, where all conditions must be true.

### Example:

```javascript
import { ZTeraDBQuery, ZTAND, ZTLTE, ZTGTE, ZTEQUAL, ZTISTARTSWITH } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTAND([
                      ZTLTE(["price", "discount"]),
                      ZTGTE(["price", 100]),
                    ]);
// This checks if price <= discount and price >= 100

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTAND([
                        ZTEQUAL("product_code", "ZT0001"),
                        ZTISTARTSWITH("product_name", "t"),
                      ]);
// This checks if product_code = "ZT0001" and product_name ilike "t%"

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
```

---

### `ZTOR(filters: Array)`
- **Description**: The `ZTOR` function creates an `OR` filter using the filters provided in the `filters` array. It returns a new `FilterConditions` instance, which can be used later in query construction. This function is especially useful when you need to retrieve records that satisfy both conditions.
  
- **Parameters**:
  - `filters` (Array): An array of filter conditions to be combined with an OR operator.
    - **FilterConditions**: Array of ZT* functions.

    - **Example**: `ZTEQUAL("product_name", "xyz")` or `ZTGT([200, price, 500])` or `ZTEQUAL(ZTSUB("price", "discount"), 10)`. `product_name` and `price` are fields in the schema.
  
- **Returns**:
  - A new `FilterConditions` instance with the `OR` operator applied to the filters.
  
- **Throws**: 
  - **`ZTeraDBError`** if invalid parameters are passed, such as unsupported data types.

- **Use Case**:
  - Use `ZTOR` when you need to filter records based on multiple conditions, where at least one condition must be true.

### Example:

```javascript
import { ZTeraDBQuery, ZTOR, ZTLTE, ZTGTE, ZTMUL, ZTEQUAL, ZTISTARTSWITH } from "zteradb";

// Example 1: Multiply two fields - "price" and "quantity"
const filterConditions = ZTOR([
                      ZTLTE(["price", "discount"]),
                      ZTGTE(["price", 100]),
                    ]);
// This checks if price <= discount or price >= 100

// Generate the query.
const query = ZTeraDBQuery("products")
  .select()
  .filterCondition(FilterConditions);

// Example 2: Multiply a constant and a field
const filterCondition2 = ZTOR([
                        ZTEQUAL("product_code", "ZT0001"),
                        ZTISTARTSWITH("product_name", "t"),
                      ]);
// This checks if product_code = "ZT0001" or product_name ilike "t%"

// Generate the query.
const query2 = ZTeraDBQuery("products")
  .select()
  .filterCondition(filterCondition2);
```

---

# `FilterConditions` Class
## **Note**: This calss is internation purpose and not used directly

## Overview

The `FilterConditions` class provides methods for building complex filter conditions. These filters can be applied to fields for various operations, such as multiplication, addition, equality checks, and logical operations like `AND` and `OR`. The methods throw errors when invalid parameters or missing values are provided.

---

### Methods

#### `setMul(params)`
- **Description**: Applies a multiplication filter to the group.
- **Parameters**: 
  - `params` (Array): An array of values to be multiplied.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the multiplication filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or missing.

#### `setSub(params)`
- **Description**: Applies a subtraction filter to the group.
- **Parameters**: 
  - `params` (Array): An array of values to be subtracted.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the subtraction filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or missing.

#### `setDiv(value1, value2)`
- **Description**: Applies a division filter to the group.
- **Parameters**: 
  - `value1` (any): The numerator (first value).
  - `value2` (any): The denominator (second value).
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the division filter applied.
- **Throws**: `ZTeraDBError`: If `value1` or `value2` are invalid.

#### `setAdd(params)`
- **Description**: Applies an addition filter to the group.
- **Parameters**: 
  - `params` (Array): An array of values to be added.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the addition filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or missing.

#### `setInFilter(key, values)`
- **Description**: Applies an "IN" filter to check if a key is in the provided list of values.
- **Parameters**:
  - `key` (any): The field to check for inclusion.
  - `values` (Array): The list of values.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "IN" filter applied.
- **Throws**: `ZTeraDBError`: If `values` is not an array or is invalid.

#### `setFieldFilter(key, params)`
- **Description**: Applies an equality filter to check if a field matches a value.
- **Parameters**: 
  - `key` (any): The field to check for equality.
  - `params` (any): The value to compare the field with.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the equality filter applied.
- **Throws**: `ZTeraDBError`: If `key` or `params` are invalid or missing.

#### `setOrFilter(params)`
- **Description**: Applies an "OR" filter to combine multiple conditions with a logical OR.
- **Parameters**: 
  - `params` (Array): An array of filter conditions.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "OR" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is not an array.

#### `setAndFilter(params)`
- **Description**: Applies an "AND" filter to combine multiple conditions with a logical AND.
- **Parameters**: 
  - `params` (Array): An array of filter conditions.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "AND" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is not an array.

#### `setGreaterThanFilter(params)`
- **Description**: Applies a "Greater Than" filter to compare values.
- **Parameters**: 
  - `params` (Array): An array containing two values: the left and right operands.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Greater Than" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or contains fewer than two elements.

#### `setGreaterThanEqualFilter(params)`
- **Description**: Applies a "Greater Than or Equal To" filter to compare values.
- **Parameters**: 
  - `params` (Array): An array containing two values: the left and right operands.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Greater Than or Equal To" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or contains fewer than two elements.

#### `setLessThanFilter(params)`
- **Description**: Applies a "Less Than" filter to compare values.
- **Parameters**: 
  - `params` (Array): An array containing two values: the left and right operands.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Less Than" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or contains fewer than two elements.

#### `setLessThanEqualFilter(params)`
- **Description**: Applies a "Less Than or Equal To" filter to compare values.
- **Parameters**: 
  - `params` (Array): An array containing two values: the left and right operands.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Less Than or Equal To" filter applied.
- **Throws**: `ZTeraDBError`: If `params` is invalid or contains fewer than two elements.

#### `setModuloFilter(param1, param2)`
- **Description**: Applies a modulo filter to calculate the remainder of division.
- **Parameters**:
  - `param1` (any): The left operand for the modulo operation.
  - `param2` (any): The right operand for the modulo operation.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the modulo filter applied.
- **Throws**: `ZTeraDBError`: If either `param1` or `param2` are invalid.

#### `setContainsFilter(field, value)`
- **Description**: Applies a "Contains" filter to check if a field contains a value.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field contains.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Contains" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

#### `setIContainsFilter(field, value)`
- **Description**: Applies a case-insensitive "Contains" filter.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field contains.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the case-insensitive "Contains" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

#### `setStartsWithFilter(field, value)`
- **Description**: Applies a "Starts With" filter to check if a field starts with a value.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field starts with.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Starts With" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

#### `setIStartsWithFilter(field, value)`
- **Description**: Applies a case-insensitive "Starts With" filter.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field starts with.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the case-insensitive "Starts With" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

#### `setEndsWithFilter(field, value)`
- **Description**: Applies an "Ends With" filter to check if a field ends with a value.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field ends with.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the "Ends With" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

#### `setIEndsWithFilter(field, value)`
- **Description**: Applies a case-insensitive "Ends With" filter.
- **Parameters**:
  - `field` (string): The field to check.
  - `value` (string): The value to check if the field ends with.
- **Returns**: `FilterConditions`: The current `FilterConditions` instance with the case-insensitive "Ends With" filter applied.
- **Throws**: `ZTeraDBError`: If `field` or `value` are invalid (e.g., not strings).

---