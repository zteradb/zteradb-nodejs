/**
 * @file helper/zteradb-common.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Common Functions Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * This file exports common helper utilities used across the ZTeraDB client module.
 * - delay: Adds a non-blocking execution pause in asynchronous workflows.
 * - sha256: Computes a secure SHA-256 hash output string for arbitrary data values.
 *
 * @dependencies
 * - crypto: Native Node.js module used for generating secure hash representations.
 *
 * @example
 * import { delay, sha256 } from './helper/zteradb-common.js';
 * await delay(1000);
 * const dataHash = sha256('secure_payload');
 *
 * @package     zteradb.helper
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

/**
 * Pauses asynchronous code execution for a specific duration.
 * @param ms - The duration to pause execution in milliseconds.
 * @returns A promise that resolves after the specified millisecond duration has passed.
 */
export function delay(ms: number): Promise<void>;

/**
 * Utility function to generate a cryptographic SHA-256 hash.
 * * This function takes an input context, normalizes it to a string string-stream layout,
 * and compiles a hexadecimal hash output representation.
 * @param data - The variable target or structure data payload to hash.
 * @returns The computed SHA-256 checksum represented as a fixed-length hexadecimal string.
 */
export function sha256(data: any): string;