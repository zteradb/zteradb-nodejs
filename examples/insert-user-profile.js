/**
 * @file insert-user-profile.js
 * @description This script inserts a new user profile into the ZTeraDB database.
 * The process consists of two main steps:
 * 1. Inserting user data (email, password, and status) into the `user` table.
 * 2. Inserting the user's profile information (address and profile image) into the `user_profile` table.
 *
 * @dependencies
 * - zteradb: A client library for interacting with ZTeraDB.
 * - environment variables for ZTearDB connection settings (ZTERADB_HOST, ZTERADB_PORT, ZTeraDBConfig).
 *
 * @async
 * @function insert_user_profile
 * @returns {Promise<{userId: number, userProfileId: number}>} 
 *   Returns an object containing the `userId` and `userProfileId` upon successful insertion.
 *   These values correspond to the newly created user and profile in the database.
 *
 * @example
 * // Call the function to insert a user profile
 * insert_user_profile();
 * 
 * @version 1.0.0
 * @author [ZTeraDB] <dev@zteradb.com>
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 *
 * @note Ensure that the ZTeraDBClient and the necessary configuration (ZTeraDBConfig) are properly set up.
 * @note Ensure that the ZTERADB_HOST and ZTERADB_PORT is set in the environemnt.
 */

// Import config
import ZTeraDBConfig from "./config.js";

// Import ZTeraDBConnection, ZTeraDBQuery from ZTeraDB client
import { ZTeraDBConnection, ZTeraDBQuery } from "zteradb";

// Get ZTERADB_HOST from environment
const ZTeraDBHost = process.env.ZTERADB_HOST;

// Get ZTERADB_PORT from environment
const ZTeraDBPort = process.env.ZTERADB_PORT;


/**
 * @function insert_user_profile
 * @description This asynchronous function inserts a new user and their associated profile into the ZTeraDB database.
 * It performs two main database insert operations:
 * 1. Inserts user information (email, password, and status) into the `user` table.
 * 2. Inserts user profile information (address and profile image) into the `user_profile` table.
 * 
 * The function first establishes a connection to the ZTeraDB database using the provided host and port from the environment variables. 
 * It then constructs and runs an `INSERT` query to add a new user. Afterward, it retrieves the `userId` from the insertion result 
 * and uses it to insert the corresponding user profile.
 * 
 * Upon successful execution, the function returns an object containing the newly created `userId` and `userProfileId`.
 * 
 * @returns {Promise<{userId: number, userProfileId: number}>} 
 *   A promise that resolves with an object containing:
 *   - `userId`: The ID of the newly inserted user.
 *   - `userProfileId`: The ID of the newly inserted user profile.
 *   
 * @throws {Error} If an error occurs during either of the database insertions, it will be logged to the console.
 * 
 * @example
 * // Example usage of the insert_user_profile function
 * insert_user_profile()
 *   .then(response => {
 *     console.log(response.userId, response.userProfileId); // Log user and profile IDs
 *   })
 *   .catch(error => {
 *     console.error("Error inserting user profile:", error);
 *   });
 */
async function insert_user_profile() {

  // Validate that environment variables are present
  if (!ZTeraDBHost || !ZTeraDBPort) {
    throw new Error("Missing ZTeraDB host or port configuration in environment variables.");
  }

  // Create ZTeraDB connection
  const connection = new ZTeraDBConnection(ZTeraDBHost, ZTeraDBPort, ZTeraDBConfig);
  
  try {
    // Constructing an INSERT query for the user schema
    const userQuery = new ZTeraDBQuery("user")
    .insert() // Insert query
    .fields({
      email: "john.doe@example.com",
      password: "9b4d99d461723232aff72be0351f114b",
      status: true
    }); // set email, password and status fields

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
          console.log("Error inserting user profile:", e); // Log the error if the user profile insertion fails
          throw e;  // throw the error
        });
    })
    .catch(e => {
      console.log(e);  // Log the error if the user insertion fails
      throw e;  // throw the error
    });

    console.log(userProfileResponse, "response"); // Log the response containing user and profile ID
  }
  catch(e) {
    console.error("Error during user profile insertion:", error);
    throw error; // Rethrow the error
  }
  finally {
    // Close the ZTeraDB connection regardless of success or failure
    connection.close();
  }
};

insert_user_profile();
