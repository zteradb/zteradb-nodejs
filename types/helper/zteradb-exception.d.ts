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
export class AuthenticationError extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
export class ZTeraDBError extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
export class ZTeraDBQueryError extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
export class ZTeraDBConditionError extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
export class NoResponseDataError extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
export class QueryComplete extends Error {
    constructor(message: any, code?: string, details?: {});
    code: string;
    details: {};
    stack: string;
}
