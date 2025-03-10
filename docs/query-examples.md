# ZTeraDB Query examples

Consider we have a database called `test` with generated database ID 7K3WHGOJKJJEJ3PFJM407QO25F. This database has following schemas.

### user schema 
  - id: integer(11) auto increment primary key
  - email: varchar(255) not null unique
  - password varchar(255) not null
  - status boolean default true

### user_profile schema
  - id: integer(11) auto increment primary key
  - user: user schema (related field)
  - address: user address varchar(255)
  - profile_image: varchar(255)

### product schema
  - id: ZTeraDB UID - Varchar field
  - name: varchar(255)
  - description: text
  - quantity: small integer(5)
  - price: integer(5)
  - create_date: datetime
  - update_date: datetime
  - status: varchar(2) (A: Available, NA: Not available)

### order schema
  - id: ZTeraDBID - Varchar field
  - product: product schema (related field)
  - user: user schema (related field)
  - create_date: datetime
  - update_date: datetime
  - status: varchar(2) (A: Approved, NA: Not Approved, D: Delivered, etc)

## Establish the database connection
  This connection will be used in all below examples

```js

// Import ZTeraDBConnection, ZTeraDBQuery classes 
import {ZTeraDBConnection, ZTeraDBQuery, Sort} from 'zteradb';

const host = "db.zteradb.com";
const port = 7777;

const ZTeraDBConfig = {
  clientKey: "7DV0AVT0VO81B9KSUJP8Q4PIFS",
  accessKey: "4SVOHVT0VO81B9KSUJP8Q4PIFS",
  secretKey: "7fbb52c011ecafaa9a1d1b8683dd661cb4143f7f27f86c0303e02880f28fe409c0b4266c012f8edf9ed1b729a6c3d6fa88d8f269d4ad146211708a2cca1a7d9a",
  databaseID: "7K3WHGOJKJJEJ3PFJM407QO25F",
  env: "dev",
  responseDataType: "json",
  options: {
    connectionPool: {
      min: 0,
      max: 0
    }
  }
}

// Establish connection with ZTeraDB server
const connection = new ZTeraDBConnection(host, port, ZTeraDBConfig);

```

## Example 1: Insert queries

### 1: Insert user and profile

```js
import ZTeraDBQuery from "zteradb";

// Constructing an INSERT query for the user schema
const userQuery = new ZTeraDBQuery("user")
  .insert() // Insert query
  .fields({ email: "john.doe@example.com", password: "9b4d99d461723232aff72be0351f114b", status: true }); // set email, password and status fields

const userProfileResponse = await connection.run(userQuery) // Run the query and retrieve the result
  .then(result => {
    const userId = result.last_insert_id; // Get the userId of the inserted user

    // Constructing an INSERT query for the user_profile schema
    const userProfileQuery = new ZTeraDBQuery("user_profile")
    .insert() // Insert query
    .fields({ user: userId, address: "a-123, xyz lane, my city, IN", profile_image: "/user/xyz.jpg" });  // set user, address and profile_image fields

    return connection.run(userProfileQuery) // Run the query and retrieve the result
      .then(userProfileResult => {
        const userProfileId = userProfileResult.last_insert_id; // Get the userProfileId
        return {userId: userId, userProfileId: userProfileId};  // Return the userId, ProfileId
      })
      .catch(e => {
        console.log(e); // Log the query
      });
  })
  .catch(e => {
    console.log(e);  // Log the query
  });

console.log(userProfileResponse, "response"); // Log the response user and profile ID

```

### 2: Insert products and orders for above inserted user ID
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Get the user id from above insert user query
const userId = 1

// Prepare products
const products = [
  {
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "quantity": 120,
    "price": 1999,
    "create_date": "2025-02-01 10:00:00",
    "update_date": "2025-02-01 10:00:00",
    "status": "A"
  },
  {
    "name": "Bluetooth Headphones",
    "description": "Noise-canceling over-ear Bluetooth headphones",
    "quantity": 50,
    "price": 5999,
    "create_date": "2025-02-02 14:30:00",
    "update_date": "2025-02-02 14:30:00",
    "status": "A"
  },
  {
    "name": "Laptop Stand",
    "description": "Adjustable laptop stand for comfortable work setup",
    "quantity": 200,
    "price": 1299,
    "create_date": "2025-02-03 09:15:00",
    "update_date": "2025-02-03 09:15:00",
    "status": "A"
  },
  {
    "name": "Smartphone Charger",
    "description": "Fast-charging USB-C smartphone charger",
    "quantity": 150,
    "price": 799,
    "create_date": "2025-02-04 11:00:00",
    "update_date": "2025-02-04 11:00:00",
    "status": "A"
  },
  {
    "name": "Portable Speaker",
    "description": "Water-resistant portable Bluetooth speaker",
    "quantity": 80,
    "price": 3499,
    "create_date": "2025-02-05 12:45:00",
    "update_date": "2025-02-05 12:45:00",
    "status": "A"
  },
  {
    "name": "4K Monitor",
    "description": "Ultra HD 4K LED monitor with HDMI port",
    "quantity": 20,
    "price": 14999,
    "create_date": "2025-02-06 16:00:00",
    "update_date": "2025-02-06 16:00:00",
    "status": "NA"
  },
  {
    "name": "Gaming Keyboard",
    "description": "RGB mechanical keyboard with customizable keys",
    "quantity": 75,
    "price": 4999,
    "create_date": "2025-02-07 13:30:00",
    "update_date": "2025-02-07 13:30:00",
    "status": "A"
  },
  {
    "name": "Wireless Charger",
    "description": "Fast wireless charging pad for smartphones",
    "quantity": 300,
    "price": 1499,
    "create_date": "2025-02-08 08:30:00",
    "update_date": "2025-02-08 08:30:00",
    "status": "A"
  },
  {
    "name": "Smartwatch",
    "description": "Fitness tracking smartwatch with heart-rate monitor",
    "quantity": 90,
    "price": 7999,
    "create_date": "2025-02-09 18:15:00",
    "update_date": "2025-02-09 18:15:00",
    "status": "A"
  },
  {
    "name": "Gaming Mouse",
    "description": "Precision gaming mouse with customizable DPI settings",
    "quantity": 130,
    "price": 2499,
    "create_date": "2025-02-10 17:00:00",
    "update_date": "2025-02-10 17:00:00",
    "status": "A"
  }
];

const orders = [
  {
    "create_date": "2025-02-21 10:00:00",
    "update_date": "2025-02-21 10:00:00",
    "status": "A"
  },
  {
    "create_date": "2025-02-21 12:00:00",
    "update_date": "2025-02-21 12:30:00",
    "status": "NA"
  },
  {
    "create_date": "2025-02-21 14:00:00",
    "update_date": "2025-02-21 14:00:00",
    "status": "D"
  },
  {
    "create_date": "2025-02-21 16:00:00",
    "update_date": "2025-02-21 16:15:00",
    "status": "A"
  },
  {
    "create_date": "2025-02-21 17:30:00",
    "update_date": "2025-02-21 17:30:00",
    "status": "NA"
  },
  {
    "create_date": "2025-02-21 18:00:00",
    "update_date": "2025-02-21 18:00:00",
    "status": "A"
  },
  {
    "create_date": "2025-02-21 19:00:00",
    "update_date": "2025-02-21 19:15:00",
    "status": "D"
  },
  {
    "create_date": "2025-02-21 20:00:00",
    "update_date": "2025-02-21 20:10:00",
    "status": "A"
  },
  {
    "create_date": "2025-02-21 21:00:00",
    "update_date": "2025-02-21 21:00:00",
    "status": "NA"
  },
  {
    "create_date": "2025-02-21 22:30:00",
    "update_date": "2025-02-21 22:40:00",
    "status": "D"
  }
];

const productIds = await Promise.all(products.map((product) => {
  // Construct query for product schema
  const productQuery = new ZTeraDBQuery("product")
    .insert() // Insert query
    .fields({ ...product });  // Set query fields
  
  return connection.run(productQuery)
    .then(result => {
      return result.last_insert_id;
    })
    .catch(e => {
      throw Error(e);
    });
}));

// Insert orders for above userID and productIds
const orderIDs = await Promise.all(orders.map((order, index) => {

  order.user = userId;
  order.product = productIds[index];

  // Construct query for order schema
  const orderQuery = new ZTeraDBQuery("order")
    .insert() // Insert query
    .fields({ ...order });  // insert field and its values
  
  return connection.run(orderQuery)
    .then(orderResult => {
      return orderResult.last_insert_id;
    });
}));

console.log(productIds); // ['4UBPSG0O18AGPBE3EFVGD1980I','4UBPSG0LILCFJ6UBSTNNIOSN7A', '4UBPSG0NPTTKHELBLRQLA8OSE6', '4UBPSG0NHB3HKIVFB8OM6QAO3N', '4UBPSG0MEK2BK2MSOJQMI3RDFF', '4UBPSG0LR8EFQIQO0JR4R1C9TK', '4UBPSG0MVONFIQITG390RAK9RG', '4UBPSG0MNOUFKR3T2RA4E1610I', '4UBPSG0M4J66LHS27F4CBU0UHG', '4UBPSG0N6Q24FBP4L1SKSS3P1P']

console.log(orderIDs);  // ['4UBPSG14JPJ99HJKTU30NSNP47', '4UBPSG13Q25830O1T6BJDH98KO', '4UBPSG156DKGSOPRB7OAFNSQK2', '4UBPSG151LJ6AK5D7A8SFUGBU2', '4UBPSG165EF6A13B83085ON38D', '4UBPSG149N8G7FPLMUQDRB5TFM', '4UBPSG141SDQTOUM04RHUJKO4G', '4UBPSG15S7AI2MQ6B3ELLGTEPJ', '4UBPSG14RQI8OTP1BRPMICJB9S', '4UBPSG15G0IB7EP9AOSKCA2C7F']

```

## Example 2: Get / Select queries

### 1: Get / Select all users
```js
// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a SELECT query
const userQuery = new ZTeraDBQuery("user")
      .select(); // Select query

// Run the query
const userResult = await connection.run(userQuery);

// Iterate the result
for await (const userData of userResult) {
  console.log(userData);  //  {email: 'john.doe@example.com', password: 'hashed_password', status: true, id: 1}
}

```

### 2. Get user where user email = "john.doe@example.com"
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a SELECT query
const userQuery = new ZTeraDBQuery("user")
      .select() // Select query
      .filter({email: "john.doe@example.com"}); // where email = "john.doe@example.com"

// Run the query
const userResult = await connection.run(userQuery);

// Iterate the result
for await (const userData of userResult) {
  console.log(userData);  //  {email: 'john.doe@example.com', password: 'hashed_password', status: true, id: 1}
}

```

### 3. Get user where user id = 1
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a SELECT query
const userQuery = new ZTeraDBQuery("user")
      .select() // Select query
      .filter({id: 1}); // where user id = 1

// Run the query
const userResult = await connection.run(userQuery);

// Iterate the result
for await (const userData of userResult) {
  console.log(userData);  //  {email: 'john.doe@example.com', password: 'hashed_password', status: true, id: 1}
}

```

### 4. Get email id from user where user status = True.
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a SELECT query
const userQuery = new ZTeraDBQuery("user")
  .select() // Select query
  .fields({email: 1})  // Select email field only
  .filter({status: true});  // where user status = true

// Run the query
const userResult = await connection.run(userQuery);

// Iterate the result
for await (const userData of userResult) {
  console.log(userData);  //  {email: 'john.doe@example.com'}
}

```

### 5. Get one product where name = "Gaming Keyboard" and create_date = "2025-02-23T01:05:48.563929"
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a SELECT query
const productQuery = new ZTeraDBQuery("product")
  .select() // Select query
  .filter({name: "Gaming Keyboard", create_date: "2025-03-05T09:53:38.077260+00:00"}) // where name="Gaming Keyboard" and create_date="2025-02-23T01:05:48.563929"
  .limit(0, 1);  // limit 0, 1

// Run the query
const productResult = await connection.run(productQuery);

// Iterate the result
for await (const productData of productResult) {
  console.log(productData);  //  { id: '4UBEU82NR0G2DQ636M6UG11MEC', name: 'Gaming Keyboard', description: 'RGB mechanical keyboard with customizable keys', quantity: 75, price: 4999, create_date: '2025-03-05T09:53:38.077260+00:00', update_date: '2025-03-05T09:53:38.077266+00:00', status: 'A' }
}

```

## Example 3: Update queries

### 1: Update product schema for all product name = "Gaming Keyboard" to name = "Wireless Gaming Keyboard"
```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing an UPDATE query
const productQuery = new ZTeraDBQuery("product")
  .update() // Update query
  .fields({name: "Wireless Gaming Keyboard"}) // set product name = "Wireless Gaming Keyboard" 
  .filter({name: "Gaming Keyboard"});  // where product name = "Gaming Keyboard"

try {
  // Run the query
  const productResult = await connection.run(productQuery);

  // Check the product status
  if (productResult["is_updated"]) {
    console.log("Product has been updated successfully.");
  }
  else{
    console.log("Product update failed.");
  }
}
catch(e) {
  console.error(e);
}

```

## Example 4: Delete queries

### 1: Delete from order schema for order id = "Wireless Gaming Keyboard"

```js

// Import ZTeraDBQuery
import { ZTeraDBQuery } from "zteradb";

// Constructing a DELETE query
const deleteOrderQuery = new ZTeraDBQuery("order")
        .delete() // Delete query
        .filter({product: "4UARJ2B0KOABVQVRSUDMLR4M89"}); // where product_id = 4UARJ2B0KOABVQVRSUDMLR4M89

// Note: product is foreign key field

try{
    // Run the query
    const deleteOrderResult = await connection.run(deleteOrderQuery);

    // Check the delete order status
    if (deleteOrderResult["is_deleted"]) {
      console.log("Order has been deleted successfully.");
    }
    else {
      console.log("Order deleted failed.");
    }
}
catch(e) {
  console.error(e)
}

```