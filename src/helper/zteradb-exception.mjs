/**
 * @file filter-functions.js
 * 
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 * 
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 *
 * @description This file contains two custom error classes:
 *                - AuthenticationError: Used for handling authentication-related errors, with custom error codes and details.
 *                - ZTeraDBError: A more general error class for handling errors in the context of ZTeraDB, also supporting custom codes and details.
 *
 * @Dependencies
 *  - None
 * 
 * Example Usage:
 * 
 *  const authError = new AuthenticationError('Invalid credentials', '9', "An error occurred while authenticating the user. Please check credentials.");
 *  console.log(authError.message); // Output: 'Invalid credentials'
 * 
 *  const dbError = new ZTeraDBError('ZTeraDB connection failed', -1, 'An error occurred while connecting to ZteraDB. Please check network connection.');
 *  console.log(dbError.message); // Output: 'Database connection failed'
 *
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */

// Custom AuthenticationError class to represent authentication-specific errors
export class AuthenticationError extends Error {
  constructor(message, code = 'AUTH_ERROR', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'AuthenticationError'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}

// Custom ZTeraDBError class to represent authentication-specific errors
export class ZTeraDBError extends Error {
  constructor(message, code = 'GENERAL_ERROR', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'ZTeraDBError'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}

// Custom ZTeraDBError class to represent authentication-specific errors
export class ZTeraDBQueryError extends Error {
  constructor(message, code = 'QUERY_ERROR', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'ZTeraDBQueryError'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}

// Custom ZTeraDBError class to represent authentication-specific errors
export class ZTeraDBConditionError extends Error {
  constructor(message, code = 'QUERY_ERROR', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'ZTeraDBConditionError'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}

// Custom NoResponseDataError class to represent authentication-specific errors
export class NoResponseDataError extends Error {
  constructor(message, code = 'NO_RESPONSE_ERROR', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'NoResponseDataError'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}

// Custom NoResponseDataError class to represent authentication-specific errors
export class QueryComplete extends Error {
  constructor(message, code = 'QUERY_COMPLETE', details = {}) {
    super(message);  // Pass message to the parent Error class
    this.name = 'QueryComplete'; // Set the error type
    this.code = code;  // Add a custom code (useful for categorizing errors)
    this.details = details;  // Optionally include more details about the error (e.g., user info)
    this.stack = (new Error()).stack; // Retain the stack trace
  }
}
