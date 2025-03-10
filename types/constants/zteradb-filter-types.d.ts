export = FilterTypes;
/**
 * @file filter-conditions.js
 *
 * Copyright (c) 2025 ZTeraDB
 * All rights reserved.
 *
 * Licensed under the ZTeraDB License. See LICENSE file for details.
 *
 * @description This file contains the `FilterTypes` frozen object for various filter types
 * used in constructing ZTeraDB queries for advanced filtering operations.
 *
 * @example
 *   const inFilter = FilterTypes.IN;
 *
 * @object FilterTypes
 * @author [ZTeraDB] <dev@zteradb.com>
 * @version 1.0.0
 * @license [ZTeraDB]
 * @see [https://zteradb.com/licence]
 */
declare const FilterTypes: Readonly<{
    AND: "&&";
    OR: "||";
    EQUAL: "=";
    ADD: "+";
    SUB: "-";
    MUL: "*";
    DIV: "/";
    MOD: "%";
    GT: ">";
    GTE: ">=";
    LT: "<";
    LTE: "<=";
    CONTAINS: "%%";
    ICONTAINS: "i%%";
    STARTSWITH: "^%%";
    ISTARTSWITH: "^i%%";
    ENDSWITH: "%%$";
    IENDSWITH: "i%%$";
    IN: "IN";
}>;
