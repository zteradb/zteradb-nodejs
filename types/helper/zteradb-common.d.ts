export function delay(ms: any): Promise<any>;
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
export function sha256(data: any): string;
