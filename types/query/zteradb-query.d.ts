/**
 * @file query/zteradb-query.d.ts
 *
 * --------------------------------------------------------------------------
 * ZTeraDB Query Class Definitions
 * --------------------------------------------------------------------------
 *
 * @description 
 * This file contains the declaration of the `ZTeraDBQuery` class, which provides a fluent API 
 * for constructing ZTeraDB queries. The class supports various SQL operations such as `INSERT`, 
 * `SELECT`, `UPDATE`, and `DELETE`.
 *
 * @dependencies
 * - **FilterCondition**: Used to define filter conditions for queries.
 * - **ZTeraDBQueryError**: Custom error class used for handling exceptions in the query building process.
 * - **FilterTypes**: A collection of constants representing various filter types.
 *
 * @example
 * import ZTeraDBQuery, { Sort } from './query/zteradb-query.js';
 * const query = new ZTeraDBQuery('my_schema', '4U6THGOJKJJEJ3PFJM407QO25F');
 * query.select()
 * .fields({ field1: 1, field2: 1 })
 * .sort({ field1: Sort.ASE })
 * .generate();
 *
 * @class       ZTeraDBQuery
 * @package     zteradb.query
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 */

import { FilterCondition } from "./zteradb-filter-conditions.js";
import FilterTypes from "@zteradb/client/constants/zteradb-filter-types";

/**
 * Enumeration map for alternative query transaction pipelines.
 */
export declare const QueryType: {
  readonly INSERT: 0x1;
  readonly SELECT: 0x2;
  readonly UPDATE: 0x3;
  readonly DELETE: 0x4;
};
export type QueryType = typeof QueryType[keyof typeof QueryType];

/**
 * Enumeration map for active result stream sorting constraints.
 */
export declare const Sort: {
  readonly ASE: 1;
  readonly DESC: -1;
};
export type Sort = typeof Sort[keyof typeof Sort];

/**
 * Interface representing the compiled structural layout of a generated ZTeraDB wire query.
 */
export interface ZTeraDBCompiledQuery {
  db: string;
  sh: string;
  qt: number;
  cnt?: boolean;
  fl?: Record<string, any>;
  rf?: Record<string, any>;
  fi?: Record<string, any>;
  fc?: any[];
  st?: Record<string, number>;
  lt?: [number, number] | [];
}

/**
 * Checks if a given string is a valid schema field name.
 * A valid schema field name can only contain alphanumeric characters and underscores.
 */
export declare function isValidSchemaField(str: string): boolean;

/**
 * The ZTeraDBQuery class provides a fluent API for building complex, valid database queries step-by-step.
 */
declare class ZTeraDBQuery {
  databaseID: string;
  schemaName: string;
  protected _queryType: QueryType | "";
  protected _fields: Record<string, any>;
  protected _relatedFields: Record<string, any>;
  protected _filters: Record<string, any>;
  protected _filter_conditions: any[];
  protected _limit: [number, number] | [];
  protected _sort: Record<string, Sort>;
  protected _count: boolean;
  protected filterTypesSet: Set<FilterTypes>;

  /**
   * Catches dynamic fields appended by method `.fields({...})` runtime payload assignments.
   */
  [customField: string]: any;

  /**
   * Constructor for creating a new query object.
   * @param schemaName - The name of the schema (required).
   * @param databaseID - The ID of the database (optional) for zteradb.
   */
  constructor(schemaName: string, databaseID?: string);

  /**
   * Set the query type to INSERT. Used for inserting new records into the database.
   */
  insert(): this;

  /**
   * Set the query type to SELECT. Used for retrieving data from the database.
   */
  select(): this;

  /**
   * Set the query type to UPDATE. Used for updating existing records in the database.
   */
  update(): this;

  /**
   * Set the query type to DELETE. Used for deleting records from the database.
   */
  delete(): this;

  /**
   * Returns the current query type code assignment.
   */
  queryType(): QueryType | "";

  /**
   * Evaluates if the current operation context is a SELECT query.
   */
  isSelectQuery(): boolean;

  /**
   * Specify the fields to be selected or affected by the query.
   * @param params - An object containing properties mapping fields to evaluate.
   */
  fields(params: Record<string, any>): this;

  /**
   * Enable the 'count' mode. The query will return the number of records instead of the actual data.
   */
  count(): this;

  /**
   * Specify related sub-queries or array selections for relations.
   * @param params - Object detailing relationships pointing to explicit query contexts.
   */
  relatedField(params: Record<string, ZTeraDBQuery | ZTeraDBQuery[]>): this;

  /**
   * Shortcut alias variation for specifying relation bindings.
   */
  related_fields(params: Record<string, ZTeraDBQuery | ZTeraDBQuery[]>): this;

  /**
   * Add a complex structural filter group context matching an internal evaluation path.
   */
  filterCondition(filterCondition: FilterCondition): this;

  /**
   * Add individual scalar filter equality parameters directly onto the selection frame.
   * @param params - Object payload dictionary assigning values to lookups.
   */
  filter(params: Record<string, any>): this;

  /**
   * Apply direction sorting limits based on structural fields.
   * @param params - Object mapping field targets to specified Sort enums.
   */
  sort(params: Record<string, Sort>): this;

  /**
   * Apply an extraction slice limit constraints onto the query transaction context.
   * @param start - The starting index boundary offset.
   * @param end - The total size threshold limit of targeted items.
   */
  limit(start: number, end: number): this;

  /**
   * Converts fields assigned onto the current builder into a normalized tracking dictionary layout.
   */
  fieldsToDict(): Record<string, any>;

  /**
   * Direct pipeline alias link for compiling out execution frames via `.generate()`.
   */
  query(): ZTeraDBCompiledQuery;

  /**
   * Validates parameter scopes and outputs the final compiled query framework.
   * @throws {ZTeraDBQueryError} If schema identifiers or execution pipeline targets are missing.
   */
  generate(): ZTeraDBCompiledQuery;
}

export default ZTeraDBQuery;