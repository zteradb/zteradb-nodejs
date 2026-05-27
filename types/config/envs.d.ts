/**
 * @file config/ebvs.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB ENVS Configuration Engine Type Definitions
 * --------------------------------------------------------------------------
 *
 * @description
 * Typings for the ZTeraDB target deployment environment validator. Defines strict 
 * runtime string literal boundaries ('dev', 'staging', 'qa', 'prod') and models 
 * the parsing hierarchy used to defend against invalid client configuration blocks.
 *
 * @example
 * import ENVS from './config/ebvs.js';
 * const errors: string[] = [];
 * const targetEnv = ENVS.parse(process.env.NODE_ENV, errors);
 * console.log(targetEnv === ENVS.PROD); 
 *
 * @package     zteradb.config
 * @version     2.0
 * @author      ZTeraDB
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

/**
 * String literal union of all allowed target runtimes.
 */
export type ZTeraDBEnvironment = 'dev' | 'staging' | 'qa' | 'prod';

/**
 * Structural interface detailing the constant environment lookup properties.
 */
export interface ENVsStructure {
  /** Local development environment. */
  readonly DEV: 'dev';
  /** Pre-production integration and staging environment. */
  readonly STAGING: 'staging';
  /** Quality assurance and automated testing environment. */
  readonly QA: 'qa';
  /** Live, customer-facing production environment. */
  readonly PROD: 'prod';
}

/**
 * Processes, validates, and aligns structural target deployment boundaries.
 */
declare class ENVSConfiguration implements ENVsStructure {
  /** Local development environment. */
  readonly DEV: 'dev';
  /** Pre-production integration and staging environment. */
  readonly STAGING: 'staging';
  /** Quality assurance and automated testing environment. */
  readonly QA: 'qa';
  /** Live, customer-facing production environment. */
  readonly PROD: 'prod';

  /**
   * Parses and normalizes the target execution environment boundary.
   * Resolves the multi-layer fallback hierarchy: User Override -> process.env -> System Default.
   * * @param userEnv - The raw environment string explicitly passed by the client.
   * @param errorArray - Shared central error context string tracker appended to on validation failure.
   * @returns The lowercased, strictly validated environment string literal. If invalid, returns 'dev'.
   */
  parse(
    userEnv: string | undefined, 
    errorArray: string[]
  ): ZTeraDBEnvironment;
}

/**
 * Exported unified Database Instance Environment verification engine context instance.
 */
declare const ENVS: ENVSConfiguration & ENVsStructure;

export default ENVS;