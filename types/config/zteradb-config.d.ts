/**
 * @file config/zteradb-config.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Config Factory Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the dynamic runtime configuration factory of the ZTeraDB client.
 * Merges user-supplied overrides with process.env properties, performs type
 * coercions, evaluates logical errors, and outputs a deeply frozen configuration object.
 *
 * @example
 * import ZTeraDBConfig from './config/zteradb-config.js';
 * * try {
 * const finalConfig = ZTeraDBConfig({
 * clientKey: 'my_client_key',
 * databaseID: 'cluster_001',
 * options: { connectionPool: { max: 5 } }
 * });
 * console.log(finalConfig.use_tls); // Outputs type-coerced boolean
 * } catch (error) {
 * console.error(error.message); // High-visibility composite validation errors
 * }
 *
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import { ZTeraDBEnvironment } from "@zteradb/client/config/envs";
import { ZTeraDBOptionsInput, ZTeraDBOptionsOutput } from "@zteradb/client/config/options";

/**
 * Interface representation mapping acceptable user configuration options input structures.
 */
export interface ZTeraDBInputConfig {
  /** Unique client identifier string. */
  clientKey?: string;
  /** Public-facing access authentication key. */
  accessKey?: string;
  /** Private secure signing key. */
  secretKey?: string;
  /** Target database cluster resource ID. */
  databaseID?: string;
  /** Runtime target environment boundary. Defaults to 'dev'. */
  env?: ZTeraDBEnvironment;
  /** Force secure TLS connection handshakes. Defaults to false. */
  use_tls?: boolean | string;
  /** Enforce rigorous remote certificate validations. Defaults to false. */
  verify_tls_host?: boolean | string;
  /** Desired default format for incoming records. E.g., 'json' or 'buffer'. */
  responseDataType?: 'json' | 'buffer' | string;
  /** Deep driver and resource orchestration configurations. */
  options?: ZTeraDBOptionsInput;
}

/**
 * Interface detailing the compiled, deeply-frozen output structural layout of the ZTeraDB client configuration.
 */
export interface ZTeraDBCompiledConfig {
  readonly clientKey: string;
  readonly accessKey: string;
  readonly secretKey: string;
  readonly databaseID: string;
  readonly env: ZTeraDBEnvironment;
  readonly use_tls: boolean;
  readonly verify_tls_host: boolean;
  readonly responseDataType: string;
  readonly options: ZTeraDBOptionsOutput;
}

/**
 * Validates, builds, and locks down a dynamic system configuration structure.
 * * * Developer Notes:
 * - User-supplied properties explicitly supersede process.env structures.
 * - Coerces loose unparsed properties (e.g. stringified booleans) into native types.
 * - Deeply freezes structural boundaries to ensure state immutability.
 * * @param config - Optional custom overrides provided by the user application.
 * @returns Fully sanitized, verified, and deeply frozen ZTeraDB configuration object payload.
 * @throws {Error} High-visibility composite exception detailing all missing mandatory keys or type violations.
 */
declare function ZTeraDBConfig(config?: ZTeraDBInputConfig): ZTeraDBCompiledConfig;

export default ZTeraDBConfig;