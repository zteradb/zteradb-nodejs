/**
 * @file helper/zteradb-exception.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Exception Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * This file exports custom exception classes tailored to encapsulate
 * semantic database errors, connection anomalies, validation schema breaks,
 * and lifecycle signals with dedicated tracking states.
 *
 * @dependencies
 * - None
 *
 * @example
 * import { ZTeraDBError, AuthenticationError } from './helper/zteradb-exception.js';
 * throw new AuthenticationError('Invalid signature provided', 'AUTH_FAIL', { IP: '127.0.0.1' });
 *
 * @package     zteradb.helper
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

/**
 * Custom error sub-class representing client authentication failures.
 */
export class AuthenticationError extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}

/**
 * General purpose error wrapper mapping base engine and network level exceptions.
 */
export class ZTeraDBError extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}

/**
 * Exception class tracking mistakes made during pipeline generation or state serialization blocks.
 */
export class ZTeraDBQueryError extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}

/**
 * Condition parsing exception triggered on bad filter definitions or argument validation breaks.
 */
export class ZTeraDBConditionError extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}

/**
 * Exception thrown when transaction channels close down or respond with a blank wire payload.
 */
export class NoResponseDataError extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}

/**
 * Sentinel signal exception used to interrupt async generator loops when a query finishes streaming data.
 */
export class QueryComplete extends Error {
  code: string | number;
  details: any;

  constructor(message: string, code?: string | number, details?: any);
}