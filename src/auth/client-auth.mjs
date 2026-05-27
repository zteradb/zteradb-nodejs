/**
 * @file auth/client-auth.mjs
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Auth Class
 * --------------------------------------------------------------------------
 * 
 * @description This file defines the `ZTeraDBClientAuth` class, which is responsible for generating, 
 * structuring, and managing cryptographic authentication requests for the ZTeraDB service. It safely
 * builds request tokens using HMAC-SHA256 signatures, manages short-lived Unix timestamps, and handles 
 * secure UUIDv4 nonces to prevent replay attacks during connection handshakes.
 * 
 * @dependencies 
 * - `crypto`: Built-in Node.js module for cryptographic features.
 * - `RequestType`: Application constant containing structural transaction codes (e.g., CONNECT).
 * 
 * @example
 * const auth = new ZTeraDBClientAuth({
 * clientKey: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
 * accessKey: '01H7297856XD86A0FKB3N4RXYH',
 * secretKey: '8f969ca1a361c47226c6363c1b82fb3a651a2e3794d4d62b512634e00b86a8a2',
 * databaseID: 'user_analytics',
 * env: 'production',
 * responseDataType: 'json'
 * });
 * const payload = auth.generateAuthRequest();
 * // Generates fresh credentials and returns a payload object containing client_key, 
 * // nonce, timestamp, signature, and connection parameters ready for transport layer transmission.
 * 
 * @class       ZTeraDBClientAuth
 * @package     zteradb.auth
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import * as crypto from "crypto";
import RequestType from "@zteradb/client/constants/zteradb-request-types";

/**
 * Class responsible for generating and managing authentication requests for the ZTeraDB service.
 * * This class is designed to handle the creation of authentication tokens and nonces, which are required
 * for establishing a secure connection to the ZTeraDB service. The `ZTeraDBClientAuth` class ensures that
 * authentication requests are made correctly by generating the necessary data, such as the `signature`,
 * and attaching relevant keys (client key, access key, and secret key) to the request.
 * * The authentication process involves generating a nonce, which is a unique value used to prevent replay attacks,
 * and a `signature` that is derived from the nonce and secret key. This information is used to authenticate
 * the client with the ZTeraDB service.
 * * @class ZTeraDBClientAuth
 */
class ZTeraDBClientAuth {
  /**
   * Creates an instance of ZTeraDBClientAuth with the provided authentication details.
   * * The instance will be responsible for generating a nonce, creating a request token,
   * and generating the authentication request required to connect to the ZTeraDB service.
   * * @param {Object} config                   - Configuration object for setting up the authentication details.
   * @param {string} config.clientKey         - Unique client identifier formatted as a Universally Unique Lexicographically Sortable Identifier (ULID).
   * @param {string} config.accessKey         - Public API access key formatted as a Universally Unique Lexicographically Sortable Identifier (ULID).
   * @param {string} config.secretKey         - Secret cryptographic signing token, expected to be exactly 64 characters in length.
   * @param {string} config.databaseID        - The database name used to execute the the schema query.
   * @param {string} config.nonce             - Secure tracking value (UUIDv4) enforcing uniqueness constraint processing to prevent playback vectors.
   * @param {number} config.timestamp         - Current Unix time stamp marker integer. Must align closely within 300 seconds of infrastructure time.
   * @param {string} config.env               - Target database environment.
   * @param {string} config.signature         - Lowercase Hex-encoded signature token. \n Formula: HMAC-SHA256(secretKey, 'accessKey:timestamp:nonce')
   * @param {string} config.responseDataType  - The response data type.
   */
  constructor({ clientKey, accessKey, secretKey, databaseID, nonce, timestamp, env, signature, responseDataType }) {
    this.clientKey = clientKey;                 // Client key (ULID format) for authenticating with ZTeraDB
    this.accessKey = accessKey;                 // Access key (ULID format) for identity checking
    this.secretKey = secretKey;                 // Secret signing key (64 characters string) used to compute request hashes
    this.databaseID = databaseID;               // Database name used to execute the the schema query.
    this.nonce = nonce;                         // Secure tracking value (UUIDv4) enforcing uniqueness constraint processing to prevent playback vectors.
    this.timestamp = timestamp;                 // Current Unix time stamp marker integer. Must align closely within 300 seconds of infrastructure time.
    this.env = env;                             // Target database environment
    this.signature = signature;                 // Lowercase Hex-encoded signature token. \n Formula: HMAC-SHA256(secret_key, 'accessKey:timestamp:nonce')
    this.responseDataType = responseDataType;   // Response data type
  }

  /**
   * Generates a unique nonce, which is a random value used to prevent replay attacks.
   * * The nonce is created by generating a cryptographically secure random UUIDv4 value.
   * This value enforces unique single-use processing on the backend, effectively mitigating replay attack vectors.
   * This nonce is then stored in the `nonce` property of the instance.
   * * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: '01ARZ3ND...', accessKey: '01H72978...', secretKey: '8f969ca1...' });
   * auth.generateNonce();
   * console.log(auth.nonce); // Outputs a valid UUIDv4 string (e.g., "de305d54-75b4-431b-adb2-eb6b9e546014")
   */
  generateNonce() {
    // const randomNumber = Math.random() * (1000000 - 10000) + 10000; // Generate random number between 10,000 and 1,000,000
    // this.nonce = sha256(randomNumber); // Hash the number with SHA-256 to create a unique nonce
    this.nonce = crypto.randomUUID();          // Generate a cryptographically secure unique UUIDv4 string
  }

  /**
   * Generates and updates the instance with the current Unix timestamp.
   * * This function calculates the current epoch time in seconds (rounded down) and stores it in the `timestamp` 
   * property of the instance. This timestamp must fall within the server's accepted time skew window (300 seconds)
   * to validate authentication requests successfully.
   * * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: '01ARZ3ND...', accessKey: '01H72978...', secretKey: '8f969ca1...' });
   * auth.getTimestamp();
   * console.log(auth.timestamp); // Outputs current epoch timestamp in seconds (e.g., 1716751200)
   */
  getTimestamp() {
    this.timestamp = Math.floor(Date.now() / 1000); // Capture current system time converted to seconds
  }

  /**
   * Generates the request token by hashing the secret key concatenated with the nonce.
   * * The `signature` is a crucial piece of the authentication process, as it
   * ensures that the authentication request is valid and unique. It is derived
   * by combining the `accessKey`, `timestamp`, and the `nonce`, and then hashing the resulting string
   * using the SHA-256 algorithm combined with the 64-character `secretKey`.
   * * @returns {string} The generated request token (64 character hex string).
   * * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: '01ARZ3ND...', accessKey: '01H72978...', secretKey: '8f969ca1...' });
   * auth.generateNonce(); // Generate nonce first
   * auth.getTimestamp(); // Populate timestamp
   * const token = auth.generateSignature();
   * console.log(token); // Outputs the generated signature hex string
   */
  generateSignature() {
    const message = `${this.accessKey}:${this.timestamp}:${this.nonce}`; // Construct signature payload message string

    const signature = crypto.createHmac('sha256', this.secretKey) // Initialize HMAC hashing engine using SHA-256 and the 64-character secret key
                            .update(message)                      // Pipe the message string payload into the hash instance
                            .digest('hex');                       // Finalize and extract the token output as a lowercase hex string
    return signature;
  }

  /**
   * Generates the full authentication request data, including client key, access key,
   * nonce, request token, and the request type for connecting to the ZTeraDB service.
   * * This method generates a full set of authentication data, including the `nonce` and
   * `signature`, and prepares it to be sent as part of an authentication request.
   * * @returns {Object} The authentication request data, including client key, access key,
   * nonce, request token, and request type.
   * * @example
   * const auth = new ZTeraDBClientAuth({ clientKey: '01ARZ3ND...', accessKey: '01H72978...', secretKey: '8f969ca1...' });
   * const authRequest = auth.generateAuthRequest();
   * console.log(authRequest);
   * // Outputs:
   * // {
   * //   client_key: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
   * //   nonce: 'de305d54-75b4-431b-adb2-eb6b9e546014',
   * //   timestamp: 1716751200,
   * //   database_id: undefined,
   * //   signature: 'a571e2b...',
   * //   request_type: 1,
   * //   env: undefined,
   * //   response_data_type: undefined
   * // }
   */
  generateAuthRequest() {
    this.generateNonce(); // Generate a unique nonce for the authentication request
    this.getTimestamp();  // Generate the request timestamp

    return {
      client_key: this.clientKey,                // Include ULID client key in the request
      nonce: this.nonce,                         // Include the generated nonce
      timestamp: this.timestamp,                 // Include timestamp in the request
      database_id: this.databaseID,               // Include the database name
      signature: this.generateSignature(),       // Include the generated request token
      request_type: RequestType.CONNECT,         // Specify the request type (CONNECT request)
      env: this.env,                             // The target database environment
      response_data_type: this.responseDataType, // Response Data type
    };
  }
}

export default ZTeraDBClientAuth;
