/**
 * @file helper/zteradb-common.js
 * 
 * --------------------------------------------------------------------------
 *  ZTeraDB Common functions
 * --------------------------------------------------------------------------
 * 
 * @description This file exports following common functions user by ZTeraDB client module.
 *               - delay: adds delay in the asynchronous function.
 *               - sha256: returns sha256 hash for given input data
 *
 * @dependencies 
 *  - crypto: for generating SHA256 hash
 *
 * @package     zteradb.helper
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */


// Import the 'crypto' module for cryptographic functions.
const crypto = require("crypto");


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility function to generate a SHA-256 hash.
 * 
 * This function takes an input `data`, converts it to a string (if it isn't already), and 
 * generates a SHA-256 hash of the data. The result is returned as a hexadecimal string.
 * 
 * @param {any} data - The data to be hashed. This can be any type, but it will be
 *                     converted to a string before hashing.
 * @returns {string} - The SHA-256 hash of the input data as a hexadecimal string.
 * 
 * @example
 * const hash = sha256('myData');
 * console.log(hash); // Outputs the SHA-256 hash of 'myData'
 */
const sha256 = (data) => {
  return crypto.createHash('sha256').update(data.toString()).digest('hex');
};

module.exports = { delay, sha256 };
