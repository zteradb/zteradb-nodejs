/**
 * @file filter-conditions.test.js
 * 
 * --------------------------------------------------------------------------
 * ZTeraDB Client - Filter Conditions Test
 * --------------------------------------------------------------------------
 * 
 * @description
 * Unit tests for the filterConditions library. This file tests various filter condition operations
 * such as Multiplication (ZTMUL), Substraction (ZTSUB), Divide (ZTDIV), Less Than (ZTLT), Less Than or Equal To (ZTLTE), Equal (ZTEQUAL), 
 * IN (ZTIN), and logical operators (AND/OR).
 * It also ensures proper error handling when invalid parameters are passed to the filter conditions.
 *
 * @author      [ZTeraDB] <dev@zteradb.com>
 * @version     2.0
 * @license     [ZTeraDB]
 * @license     https://zteradb.com/licence   (SPDX-License-Identifier: Proprietary)
 *
 * Test cases include:
 * 1. Validating input types (e.g., ensuring arrays are passed where required).
 * 2. Testing expected results for different filter operations.
 * 3. Ensuring that errors are thrown for invalid inputs with specific error messages.
 * 4. Combining multiple conditions using logical operators (AND/OR).
 * 
 * @dependencies
 * - Jest: A JavaScript testing framework used to run and manage the test cases.
 * - zteradb-filter-conditions-functions: The functions being tested.
 * 
 * @example
 * ```js
 * // Running the test suite
 * $ npm test
 * ```
 */
// Import necessary modules and types
import { ZTeraDBException } from "@zteradb/client";
import * as filterConditions from "@zteradb/client/query/zteradb-filter-conditions-functions";


describe('filterConditions library tests', () => {

  /**
   * Test case for the addition operation (`ZTADD`).
   * This test checks that an error is thrown if the `ZTADD` function is called with invalid parameter types.
   * Specifically, it ensures that when the input is not an array, the function throws a `ZTeraDBConditionError` with the message "Invalid `values`".
   */
  test('addition operation should throw error when params is not an array', () => {
    // Testing invalid input types to ensure proper error handling for `ZTADD`

    // Expecting an error when a string is passed as the argument
    expect(() => filterConditions.ZTADD("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when an object is passed as the argument
    expect(() => filterConditions.ZTADD({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when a number is passed as the argument
    expect(() => filterConditions.ZTADD(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when no argument is passed at all
    expect(() => filterConditions.ZTADD()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test case for the addition operation (`ZTADD`).
   * This test checks that the `ZTADD` function works as expected when called with valid parameters.
   * Specifically, it ensures that when an array of numbers is passed as the argument, the operation correctly formats the result into a JSON object with the operator `+` and the provided operand.
   */
  test('addition operation should work', () => {
    // Testing valid input (an array with numbers) to ensure proper functionality of `ZTADD`

    // Expecting that when calling `ZTADD` with [1, 2], it produces a JSON object with the correct operator and operand.
    expect(filterConditions.ZTADD([1, 2]).getJSON()).toEqual(JSON.stringify({ operator: '+', operand: [1, 2] }));
  });

  /**
   * Test case for the subtraction operation (`ZTSUB`).
   * This test verifies that the `ZTSUB` function throws an error when it is called with invalid parameters.
   * Specifically, it ensures that non-array inputs (such as strings, objects, numbers, and undefined) trigger the appropriate error handling.
   */
  test('substraction operation should throw error when params is not an array', () => {
    // Testing invalid inputs to ensure proper error handling for the `ZTSUB` function.

    // Expecting an error when passing a string as the parameter.
    expect(() => filterConditions.ZTSUB("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when passing an object as the parameter.
    expect(() => filterConditions.ZTSUB({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when passing a number as the parameter.
    expect(() => filterConditions.ZTSUB(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Expecting an error when no parameters are passed.
    expect(() => filterConditions.ZTSUB()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test case for the subtraction operation (`ZTSUB`).
   * This test verifies that the `ZTSUB` function works correctly when it is provided with valid parameters (an array of numbers).
   * Specifically, it checks if the `getJSON` method correctly generates the expected JSON representation of the subtraction operation.
   */
  test('substraction operation should work', () => {
    // Testing valid inputs for the `ZTSUB` operation.
    // We are providing an array [1, 2] as the operand to the `ZTSUB` function.

    // Expecting the correct JSON output when the `ZTSUB` operation is applied to the array [1, 2].
    expect(filterConditions.ZTSUB([1, 2]).getJSON()).toEqual(JSON.stringify({ operator: '-', operand: [ 1, 2 ] }));
  });

  /**
   * Test case for the multiplication operation (`ZTMUL`).
   * This test ensures that the `ZTMUL` function throws the correct error when it is provided with invalid parameters
   * (i.e., parameters that are not arrays).
   */
  test('multiplication operation should throw error when params is not an array', () => {
    // Expecting the `ZTMUL` function to throw an error when provided with invalid inputs.

    // Test case 1: Pass a string to `ZTMUL`. This should throw an error as the input should be an array.
    expect(() => filterConditions.ZTMUL("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Pass an object to `ZTMUL`. This should also throw an error since the input is not an array.
    expect(() => filterConditions.ZTMUL({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Pass a number to `ZTMUL`. The function expects an array, so this should throw an error.
    expect(() => filterConditions.ZTMUL(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 4: Call `ZTMUL` without any parameters. This should throw an error since the parameter is required.
    expect(() => filterConditions.ZTMUL()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test case for the multiplication operation (`ZTMUL`).
   * This test ensures that the `ZTMUL` function behaves as expected when it is provided with valid parameters
   * (i.e., arrays) and returns the correct JSON structure.
   */
  test('multiplication operation should work', () => {
    // Test case 1: Pass an array with two string elements ("price" and "quantity") to `ZTMUL`.
    // The expected result is a JSON object with the operator "*" and the operand being the array ["price", "quantity"].
    expect(filterConditions.ZTMUL(["price", "quantity"]).getJSON()).toEqual(JSON.stringify({
      "operator":"*",
      "operand": ["price", "quantity"]
    }));

    // Test case 2: Pass an array with a string ("price") and a number (10) to `ZTMUL`.
    // The expected result is a JSON object with the operator "*" and the operand being the array ["price", 10].
    expect(filterConditions.ZTMUL(["price", 10]).getJSON()).toEqual(JSON.stringify({
      "operator":"*",
      "operand": ["price", 10]
    }));


    // Test case 3: Pass an array with two number elements (200 and 100) to `ZTMUL`.
    // The expected result is a JSON object with the operator "*" and the operand being the array [200, 100].
    expect(filterConditions.ZTMUL([200, 100]).getJSON()).toEqual(JSON.stringify({ 
        "operator": "*", 
        "operand": [200, 100] 
    }));
  });

  /**
   * Test case for the division operation (`ZTDIV`).
   * This test ensures that the `ZTDIV` function throws the expected error when the `dividend` is not of type number, float, or a valid schema field name.
   */
  test('divide operation should throw error when dividend is not a number, float or string', () => {
    // Test case 1: Pass an object as the dividend. 
    // Since `dividend` must be either a number, float, or a string (schema field name),
    // this should throw an error with the message "`dividend` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "`dividend` must be integer, float or schema field name");

    // Test case 2: Call `ZTDIV` with no parameters. 
    // The dividend argument is missing, so it should throw an error with the message "`dividend` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV()).toThrow(ZTeraDBException.ZTeraDBConditionError, "`dividend` must be integer, float or schema field name");
  });

  /**
   * Test case for the division operation (`ZTDIV`).
   * This test ensures that the `ZTDIV` function throws the expected error when the `divisor` is not of type number, float, or a valid schema field name.
   */
  test('divide operation should throw error when divisor is not a number, float or string', () => {
    // Test case 1: Pass an object as the divisor.
    // Since `divisor` must be either a number, float, or a string (schema field name),
    // this should throw an error with the message "`divisor` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV(12, {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "`divisor` must be integer, float or schema field name");


    // Test case 2: Pass a number as the divisor without any second argument.
    // The divisor must be of a valid type, but since the second argument is not a valid divisor type,
    // it should throw an error with the message "`divisor` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "`divisor` must be integer, float or schema field name");


    // Test case 3: Pass an array as the divisor. 
    // Since an array is not a valid divisor type, it should throw an error with the message "`divisor` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "`divisor` must be integer, float or schema field name");


    // Test case 4: Incorrect format with a number and an array as the divisor.
    // Since the divisor is an array which is not a valid type, the function should throw an error with the message "`divisor` must be integer, float or schema field name".
    expect(() => filterConditions.ZTDIV(123, [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "`divisor` must be integer, float or schema field name");
  });

  /**
   * Test case for the division operation (`ZTDIV`).
   * This test ensures that the `ZTDIV` function correctly performs the division operation
   * and returns the expected result in the correct JSON format.
   */
  test('divide operation should work', () => {
    // Test case 1: Dividing a schema field ("price") by a number (10).
    // The result should be a JSON object with operator "/" and operand ["price", 10].
    expect(filterConditions.ZTDIV("price", 10).getJSON()).toEqual(JSON.stringify({ "operator":"/", "operand": ["price", 10] }));

    // Test case 2: Dividing a number (200) by another number (10).
    // The result should be a JSON object with operator "/" and operand [200, 10].
    expect(filterConditions.ZTDIV(200, 10).getJSON()).toEqual(JSON.stringify({ "operator":"/", "operand": [200, 10] }));
  });

  /**
  * Test case for the modulo operation (`ZTMOD`).
  * This test ensures that the `ZTMOD` function throws an error when the numerator is not a number, float, or string.
  */
  test('modulo operation should throw error when numerator is not a number, float or string', () => {
    // Test case 1: Pass an object as the numerator.
    // Since the numerator must be a number, float, or schema field name, this should throw an error
    // with the message "`numerator` must be integer, float or schema field name".
    expect(() => filterConditions.ZTMOD({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "`numerator` must be integer, float or schema field name");

    // Test case 2: Call the modulo operation without passing a numerator.
    // Since the numerator is required and not provided, this should throw an error with the message
    // "`numerator` must be integer, float or schema field name".
    expect(() => filterConditions.ZTMOD()).toThrow(ZTeraDBException.ZTeraDBConditionError, "`numerator` must be integer, float or schema field name");
  });

  /**
   * Test case for the modulo operation (`ZTMOD`).
   * This test ensures that the `ZTMOD` function throws an error when the denominator is not a number, float, or string.
   */
  test('modulo operation should throw error when denominator is not a number, float or string', () => {
    // Test case 1: Pass an object as the denominator.
    // Since the denominator must be a number, float, or schema field name, this should throw an error
    // with the message "`denominator` must be integer, float or schema field name".
    expect(() => filterConditions.ZTMOD(12, {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "`denominator` must be integer, float or schema field name");

    // Test case 2: Pass a number (123) as the denominator.
    // This should throw an error since the denominator must be a number, float, or schema field name.
    expect(() => filterConditions.ZTMOD(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "`denominator` must be integer, float or schema field name");

    // Test case 3: Pass an array ([123]) as the denominator.
    // Since arrays are not allowed, this should throw an error with the message "`denominator` must be integer, float or schema field name".
    expect(() => filterConditions.ZTMOD([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "`denominator` must be integer, float or schema field name");

    // Test case 4: Pass a number (123) as the numerator and an array ([123]) as the denominator.
    // Since the denominator must be a number, float, or schema field name, this should throw an error.
    expect(() => filterConditions.ZTMOD(123, [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "`denominator` must be integer, float or schema field name");
  });

  /**
  * Test case for the modulo operation (`ZTMOD`).
  * This test ensures that the `ZTMOD` function correctly performs the modulo operation
  * and returns the expected result in the correct JSON format.
  */
  test('modulo operation should work', () => {
    // Test case 1: Modulo operation with a schema field ("price") and a number (10).
    // The result should be a JSON object with operator "%" and operand ["price", 10].
    expect(filterConditions.ZTMOD("price", 10).getJSON()).toEqual(JSON.stringify({ "operator":"%", "operand": ["price", 10] }));

    // Test case 2: Modulo operation with two numbers (200 and 10).
    // The result should be a JSON object with operator "%" and operand [200, 10].
    expect(filterConditions.ZTMOD(200, 10).getJSON()).toEqual(JSON.stringify({ "operator":"%", "operand": [200, 10] }));
  });

  /**
   * Test case for the "schema field contains some value" operation (`ZTCONTAINS`).
   * This test ensures that the `ZTCONTAINS` function throws an error when the field is not a string.
   */
  test('schema field contains some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string, representing the field name. If it's not a string,
    // the function should throw an error with the message "The `field` argument must be field name in contains filter."
    expect(() => filterConditions.ZTCONTAINS({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in contains filter.");

    // Test case 2: Pass a number as the schema field.
    // Again, the schema field must be a string, so the function should throw an error with the same message.
    expect(() => filterConditions.ZTCONTAINS(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in contains filter.");

    // Test case 3: Pass an array as the schema field.
    // The schema field must be a string, so an array will throw an error as well.
    expect(() => filterConditions.ZTCONTAINS([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in contains filter.");
  });

  /**
  * Test case for the "schema field contains some value" operation (`ZTCONTAINS`).
  * This test ensures that the `ZTCONTAINS` function throws an error when the value is not a string.
  */
  test('schema field contains some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument should be a string. If it's not a string (like an object in this case),
    // the function should throw an error with the message "The `value` argument must be field value in contains filter."
    expect(() => filterConditions.ZTCONTAINS("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in contains filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number should trigger the error.
    expect(() => filterConditions.ZTCONTAINS("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in contains filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value must be a string, so an array will trigger an error.
    expect(() => filterConditions.ZTCONTAINS("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in contains filter.");
  });

  /**
  * Test case for the "schema field contains some value" operation (`ZTCONTAINS`).
  * This test ensures that the `ZTCONTAINS` function works correctly when valid field and value are provided.
  */
  test('schema field contains some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "%%" and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTCONTAINS("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "%%", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test case for the "schema field icontains some value" operation (`ZTICONTAINS`).
   * This test ensures that the `ZTICONTAINS` function throws an error when the field is not a string.
   */
  test('schema field icontains some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string, representing the field name. If it's not a string,
    // the function should throw an error with the message "The `field` argument must be field name in icontains filter."
    expect(() => filterConditions.ZTCONTAINS({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in icontains filter.");

    // Test case 2: Pass a number as the schema field.
    // The schema field must be a string, so the function should throw an error with the same message.
    expect(() => filterConditions.ZTCONTAINS(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in icontains filter.");

    // Test case 3: Pass an array as the schema field.
    // The schema field must be a string, so an array will throw an error as well.
    expect(() => filterConditions.ZTCONTAINS([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in icontains filter.");
  });

  /**
  * Test case for the "schema field icontains some value" operation (`ZTICONTAINS`).
  * This test ensures that the `ZTICONTAINS` function throws an error when the value is not a string.
  */
  test('schema field icontains some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument should be a string. If it's not a string (like an object in this case),
    // the function should throw an error with the message "The `value` argument must be field value in icontains filter."
    expect(() => filterConditions.ZTCONTAINS("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in icontains filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number should trigger the error.
    expect(() => filterConditions.ZTCONTAINS("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in icontains filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value must be a string, so an array will trigger an error.
    expect(() => filterConditions.ZTCONTAINS("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field value in icontains filter.");
  });

  /**
  * Test case for the "schema field icontains some value" operation (`ZTICONTAINS`).
  * This test ensures that the `ZTICONTAINS` function works correctly when valid field and value are provided.
  */
  test('schema field icontains some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "i%%" and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTICONTAINS("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "i%%", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test case for the "schema field starts with some value" operation (`ZTSTARTSWITH`).
   * This test ensures that the `ZTSTARTSWITH` function throws an error when the field is not a string.
   */
  test('schema field starts with some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string (representing the field name). 
    // If it’s not a string, the function should throw an error with the message "The `field` argument must be field name in startsWith filter."
    expect(() => filterConditions.ZTSTARTSWITH({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");

    // Test case 2: Pass a number as the schema field.
    // The field argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTSTARTSWITH(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");

    // Test case 3: Pass an array as the schema field.
    // The field argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTSTARTSWITH([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");
  });

  /**
  * Test case for the "schema field starts with some value" operation (`ZTSTARTSWITH`).
  * This test ensures that the `ZTSTARTSWITH` function throws an error when the value is not a string.
  */
  test('schema field starts with some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument must be a string. If it’s not a string (e.g., an object), the function should throw an error.
    expect(() => filterConditions.ZTSTARTSWITH("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in startsWith filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTSTARTSWITH("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in startsWith filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTSTARTSWITH("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in startsWith filter.");
  });

  /**
  * Test case for the "schema field starts with some value" operation (`ZTSTARTSWITH`).
  * This test ensures that the `ZTSTARTSWITH` function works correctly when valid field and value are provided.
  */
  test('schema field starts with some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "^%%" and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTSTARTSWITH("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "^%%", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test case for the "schema field starts with some value" operation (case-insensitive) (`ZTISTARTSWITH`).
   * This test ensures that the `ZTISTARTSWITH` function throws an error when the field is not a string.
   */
  test('schema field istarts with some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string (representing the field name). 
    // If it’s not a string, the function should throw an error with the message "The `field` argument must be field name in startsWith filter."
    expect(() => filterConditions.ZTISTARTSWITH({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");

    // Test case 2: Pass a number as the schema field.
    // The field argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTISTARTSWITH(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");

    // Test case 3: Pass an array as the schema field.
    // The field argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTISTARTSWITH([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in startsWith filter.");
  });

  /**
  * Test case for the "schema field starts with some value" operation (case-insensitive) (`ZTISTARTSWITH`).
  * This test ensures that the `ZTISTARTSWITH` function throws an error when the value is not a string.
  */
  test('schema field istarts with some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument must be a string. If it’s not a string (e.g., an object), the function should throw an error.
    expect(() => filterConditions.ZTISTARTSWITH("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in istartsWith filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTISTARTSWITH("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in istartsWith filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTISTARTSWITH("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in istartsWith filter.");
  });

  /**
  * Test case for the "schema field starts with some value" operation (case-insensitive) (`ZTISTARTSWITH`).
  * This test ensures that the `ZTISTARTSWITH` function works correctly when valid field and value are provided.
  */
  test('schema field istarts with some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "^i%%" and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTISTARTSWITH("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "^i%%", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test case for the "schema field ends with some value" operation (`ZTENDSWITH`).
   * This test ensures that the `ZTENDSWITH` function throws an error when the field is not a string.
   */
  test('schema field ends with some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string (representing the field name). 
    // If it’s not a string, the function should throw an error with the message "The `field` argument must be field name in endsWith filter."
    expect(() => filterConditions.ZTENDSWITH({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in endsWith filter.");

    // Test case 2: Pass a number as the schema field.
    // The field argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTENDSWITH(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in endsWith filter.");

    // Test case 3: Pass an array as the schema field.
    // The field argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTENDSWITH([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in endsWith filter.");
  });

  /**
  * Test case for the "schema field ends with some value" operation (`ZTENDSWITH`).
  * This test ensures that the `ZTENDSWITH` function throws an error when the value is not a string.
  */
  test('schema field ends with some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument must be a string. If it’s not a string (e.g., an object), the function should throw an error.
    expect(() => filterConditions.ZTENDSWITH("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in endsWith filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTENDSWITH("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in endsWith filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value argument must be a string, so an array will trigger an error as well.
    expect(() => filterConditions.ZTENDSWITH("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in endsWith filter.");
  });

  /**
  * Test case for the "schema field ends with some value" operation (`ZTENDSWITH`).
  * This test ensures that the `ZTENDSWITH` function works correctly when valid field and value are provided.
  */
  test('schema field ends with some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "%%$", and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTENDSWITH("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "%%$", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test case for the "schema field iends with some value" operation (`ZTIENDSWITH`).
   * This test ensures that the `ZTIENDSWITH` function throws an error when the field is not a string.
   */
  test('schema field iends with some value operation should throw error when schema field is not string', () => {
    // Test case 1: Pass an object as the schema field (field should be a string).
    // The field argument should be a string (representing the field name).
    // If it’s not a string, the function should throw an error with the message "The `field` argument must be field name in iendsWith filter."
    expect(() => filterConditions.ZTIENDSWITH({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in iendsWith filter.");

    // Test case 2: Pass a number as the schema field.
    // The field argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTIENDSWITH(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in iendsWith filter.");

    // Test case 3: Pass an array as the schema field.
    // The field argument must be a string, so an array will trigger an error.
    expect(() => filterConditions.ZTIENDSWITH([123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument must be field name in iendsWith filter.");
  });

  /**
  * Test case for the "schema field iends with some value" operation (`ZTIENDSWITH`).
  * This test ensures that the `ZTIENDSWITH` function throws an error when the value is not a string.
  */
  test('schema field iends with some value operation should throw error when value is not string', () => {
    // Test case 1: Pass a schema field name "name" and an object as the value.
    // The value argument must be a string. If it’s not a string (e.g., an object), the function should throw an error.
    expect(() => filterConditions.ZTIENDSWITH("name", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in iendsWith filter.");

    // Test case 2: Pass a schema field name "name" and a number as the value.
    // The value argument must be a string, so passing a number will trigger the error.
    expect(() => filterConditions.ZTIENDSWITH("name", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in iendsWith filter.");

    // Test case 3: Pass a schema field name "name" and an array as the value.
    // The value argument must be a string, so an array will trigger an error.
    expect(() => filterConditions.ZTIENDSWITH("name", [123])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `value` argument must be field name in iendsWith filter.");
  });

  /**
  * Test case for the "schema field iends with some value" operation (`ZTIENDSWITH`).
  * This test ensures that the `ZTIENDSWITH` function works correctly when valid field and value are provided.
  */
  test('schema field iends with some value operation should work', () => {
    // Test case: Pass a valid schema field ("name") and a valid string value ("mouse").
    // The result should be a JSON object with the operator "i%%$", and the operands being the field "name" and value "mouse".
    expect(filterConditions.ZTIENDSWITH("name", "mouse").getJSON()).toEqual(JSON.stringify({ "operator": "i%%$", "operand": "name", "result": "mouse" }));
  });

  /**
   * Test to ensure that the greater than (ZTGT) operation throws an error 
   * when the parameters are not an array.
   */
  test('greater than operation should throw error when params is not an array', () => {
    // Test case 1: Passing an invalid string ("invalid") as the parameter for ZTGT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`"
    expect(() => filterConditions.ZTGT("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing an object ({x: 1}) as the parameter for ZTGT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`"
    expect(() => filterConditions.ZTGT({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Passing a number (123) as the parameter for ZTGT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`"
    expect(() => filterConditions.ZTGT(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 4: Passing no parameters to ZTGT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`"
    expect(() => filterConditions.ZTGT()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test to ensure that the greater than (ZTGT) operation works as expected when the 
   * parameters are arrays.
   */
  test('greater than operation should work', () => {
    // Test case 1: Passing an array with two elements ("price" and "quantity") to ZTGT.
    // The function should return the expected JSON structure with the ">" operator 
    // and the operands as the array ["price", "quantity"].
    expect(filterConditions.ZTGT(["price", "quantity"]).getJSON()).toEqual(JSON.stringify({ "operator":">", "operand": ["price", "quantity"] }));

    // Test case 2: Passing an array with the first element "price" and second element 10 to ZTGT.
    // The function should return the expected JSON structure with the ">" operator 
    // and the operands as the array ["price", 10].
    expect(filterConditions.ZTGT(["price", 10]).getJSON()).toEqual(JSON.stringify({ "operator":">", "operand": ["price", 10] }));

    // Test case 3: Passing an array with two numerical values (200 and 100) to ZTGT.
    // The function should return the expected JSON structure with the ">" operator 
    // and the operands as the array [200, 100].
    expect(filterConditions.ZTGT([200, 100]).getJSON()).toEqual(JSON.stringify({ "operator":">", "operand": [200, 100] }));
  });

  /**
  * Test to ensure that the greater than or equal to (ZTGTE) operation throws an error 
  * when the parameters are not arrays.
  */
  test('greater than or equal to operation should throw error when params is not an array', () => {
    // Test case 1: Passing a string ("invalid") to ZTGTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTGTE("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing an object ({x: 1}) to ZTGTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTGTE({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Passing a number (123) to ZTGTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTGTE(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 4: Passing no parameters to ZTGTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTGTE()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test to ensure that the greater than or equal to (ZTGTE) operation works as expected
   * when the parameters are arrays.
   */
  test('greater than or equal to operation should work', () => {
    // Test case 1: Passing an array with two elements ("price" and "quantity") to ZTGTE.
    // The function should return the expected JSON structure with the ">=" operator 
    // and the operands as the array ["price", "quantity"].
    expect(filterConditions.ZTGTE(["price", "quantity"]).getJSON()).toEqual(JSON.stringify({ "operator":">=", "operand": ["price", "quantity"] }));

    // Test case 2: Passing an array with the first element "price" and second element 10 to ZTGTE.
    // The function should return the expected JSON structure with the ">=" operator 
    // and the operands as the array ["price", 10].
    expect(filterConditions.ZTGTE(["price", 10]).getJSON()).toEqual(JSON.stringify({ "operator":">=", "operand": ["price", 10] }));

    // Test case 3: Passing an array with two numerical values (200 and 100) to ZTGTE.
    // The function should return the expected JSON structure with the ">=" operator 
    // and the operands as the array [200, 100].
    expect(filterConditions.ZTGTE([200, 100]).getJSON()).toEqual(JSON.stringify({ "operator":">=", "operand": [200, 100] }));
  });

  /**
  * Test to ensure that the less than (ZTLT) operation throws an error 
  * when the parameters are not arrays.
  */
  test('less than operation should throw error when params is not an array', () => {
    // Test case 1: Passing a string ("invalid") to ZTLT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLT("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing an object ({x: 1}) to ZTLT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLT({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Passing a number (123) to ZTLT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLT(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 4: Passing no parameters to ZTLT.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLT()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
  * Test to ensure that the less than (ZTLT) operation works as expected when 
  * the parameters are arrays.
  */
  test('less than operation should work', () => {
    // Test case 1: Passing an array with two elements ("price" and "quantity") to ZTLT.
    // The function should return the expected JSON structure with the "<" operator 
    // and the operands as the array ["price", "quantity"].
    expect(filterConditions.ZTLT(["price", "quantity"]).getJSON()).toEqual(JSON.stringify({ "operator":"<", "operand": ["price", "quantity"] }));

    // Test case 2: Passing an array with the first element "price" and second element 10 to ZTLT.
    // The function should return the expected JSON structure with the "<" operator 
    // and the operands as the array ["price", 10].
    expect(filterConditions.ZTLT(["price", 10]).getJSON()).toEqual(JSON.stringify({ "operator":"<", "operand": ["price", 10] }));

    // Test case 3: Passing an array with two numerical values (200 and 100) to ZTLT.
    // The function should return the expected JSON structure with the "<" operator 
    // and the operands as the array [200, 100].
    expect(filterConditions.ZTLT([200, 100]).getJSON()).toEqual(JSON.stringify({ "operator":"<", "operand": [200, 100] }));
  });

  /**
   * Test to ensure that the less than or equal to (ZTLTE) operation throws an error 
   * when the parameters are not arrays.
   */
  test('less than or equal to operation should throw error when params is not an array', () => {
    // Test case 1: Passing a string ("invalid") to ZTLTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLTE("invalid")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing an object ({x: 1}) to ZTLTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLTE({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Passing a number (123) to ZTLTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLTE(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 4: Passing no parameters to ZTLTE.
    // The function should throw a ZTeraDBConditionError with the message "Invalid `values`".
    expect(() => filterConditions.ZTLTE()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test to ensure that the less than or equal to (ZTLTE) operation works correctly 
   * when provided valid parameters (an array of values).
   */
  test('less than or equal to operation should work', () => {
    // Test case 1: Passing an array with field names ["price", "quantity"].
    // The expected result should be a JSON string representing the operator "<=" 
    // with operands ["price", "quantity"].
    expect(filterConditions.ZTLTE(["price", "quantity"]).getJSON()).toEqual(JSON.stringify({ 
        "operator": "<=", 
        "operand": ["price", "quantity"]
    }));

    // Test case 2: Passing an array with a field name and a constant value ["price", 10].
    // The expected result should be a JSON string representing the operator "<=" 
    // with operands ["price", 10].
    expect(filterConditions.ZTLTE(["price", 10]).getJSON()).toEqual(JSON.stringify({
        "operator": "<=", 
        "operand": ["price", 10]
    }));

    // Test case 3: Passing an array with two numeric values [200, 100].
    // The expected result should be a JSON string representing the operator "<=" 
    // with operands [200, 100].
    expect(filterConditions.ZTLTE([200, 100]).getJSON()).toEqual(JSON.stringify({
        "operator": "<=", 
        "operand": [200, 100]
    }));
  });

  /**
   * Test to ensure that the IN operation throws an error when the field is not a string.
   * The IN operation should only accept a field name as a string value.
   */
  test('IN operation should throw error when field is not string', () => {
    // Test case 1: Passing an object instead of a string for the field should throw an error
    expect(() => filterConditions.ZTIN({x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing a number instead of a string for the field should throw an error
    expect(() => filterConditions.ZTIN(123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Calling the IN operation without any values should throw an error
    expect(() => filterConditions.ZTIN()).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test to ensure that the IN operation throws an error when the value is not an array.
   * The IN operation expects an array of values to check against.
   */
  test('IN operation should throw error when value is not an array', () => {
    // Test case 1: Passing an object instead of an array for values should throw an error
    expect(() => filterConditions.ZTIN("price", {x: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 2: Passing a number instead of an array for values should throw an error
    expect(() => filterConditions.ZTIN("price", 123)).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case 3: Calling the IN operation with a single field and no array should throw an error
    expect(() => filterConditions.ZTIN("price")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");
  });

  /**
   * Test to ensure that the IN operation works correctly when a valid field and an array of values are provided.
   * The IN operation checks if the field value is contained within the provided array of values.
   */
  test('IN operation should work', () => {
    // Test case: The IN operation should successfully return the expected JSON when a valid field ("price")
    // and an array of values ([10, 20, 33, 50]) are provided.
    expect(filterConditions.ZTIN("price", [10, 20, 33, 50]).getJSON()).toEqual(
        JSON.stringify({ "operator": "IN", "operand": "price", "result": [10, 20, 33, 50] })
    );
  });


  /**
   * Test to ensure that the "equal" operation throws errors when an invalid field is passed.
   * The operation expects a valid field, and throws a specific error if the field is not provided or is invalid.
   */
  test('equal operation should throw error when field is not string', () => {
    // Test case: The ZTEQUAL operation should throw an error when no field is provided.
    expect(() => filterConditions.ZTEQUAL()).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `field` argument is required.");

    // Test case: The ZTEQUAL operation should throw an error when an empty array is provided as a field.
    expect(() => filterConditions.ZTEQUAL([])).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `params` argument.");

    // Test case: The ZTEQUAL operation should throw an error when an array is provided as a field.
    expect(() => filterConditions.ZTEQUAL([1, 2, 3])).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `params` argument.");

    // Test case: The ZTEQUAL operation should throw an error when an object is provided as a field.
    expect(() => filterConditions.ZTEQUAL({prince: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `params` argument.");
  });


  /**
   * Test to ensure that the "equal" operation throws errors when an invalid value is provided.
   * The operation expects a valid value for comparison, and throws a specific error if the value is invalid.
   */
  test('equal operation should throw error when value is invalid', () => {
    // Test case: The ZTEQUAL operation should throw an error when the value is missing.
    expect(() => filterConditions.ZTEQUAL("price")).toThrow(ZTeraDBException.ZTeraDBConditionError, "Invalid `values`");

    // Test case: The ZTEQUAL operation should throw an error when an empty array is provided as the result.
    expect(() => filterConditions.ZTEQUAL("price", [])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `result` argument is required.");

    // Test case: The ZTEQUAL operation should throw an error when an array is provided as the result.
    expect(() => filterConditions.ZTEQUAL("price", [1, 2, 3])).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `result` argument is required.");

    // Test case: The ZTEQUAL operation should throw an error when an object is provided as the result.
    expect(() => filterConditions.ZTEQUAL("price", {prince: 1})).toThrow(ZTeraDBException.ZTeraDBConditionError, "The `result` argument is required.");
  });

  /**
   * Test to ensure that the "equal" operation works correctly when valid arguments are provided.
   * The operation compares a field with a value, and can handle various operations as operands.
   */
  test('equal operation should work', () => {
    // Test case 1: Basic equality comparison for a single value (price equals 100).
    expect(filterConditions.ZTEQUAL("price", 100).getJSON()).toEqual(JSON.stringify({ "operator": "=", "operand": "price", "result": 100 }));

    // Test case 2: Equality comparison where the operand is the result of a multiplication operation (price * quantity equals 100).
    expect(filterConditions.ZTEQUAL(filterConditions.ZTMUL(["price", "quantity"]), 100).getJSON()).toEqual(JSON.stringify({
        "operator": "=",
        "operand": { "operator": "*", "operand": ["price", "quantity"] },
        "result": 100
    }));

    // Test case 3: Equality comparison where the operand is the result of a division operation (price / quantity equals 200).
    expect(filterConditions.ZTEQUAL(filterConditions.ZTDIV("price", "quantity"), 200).getJSON()).toEqual(JSON.stringify({
        "operator": "=",
        "operand": { "operator": "/", "operand": ["price", "quantity"] },
        "result": 200
    }));

    // Test case 4: Equality comparison where the operand is the result of an addition operation (price + quantity equals 20).
    expect(filterConditions.ZTEQUAL(filterConditions.ZTADD(["price", "quantity"]), 20).getJSON()).toEqual(JSON.stringify({
        "operator": "=",
        "operand": { "operator": "+", "operand": ["price", "quantity"] },
        "result": 20
    }));

    // Test case 5: Equality comparison where the operand is the result of a subtraction operation (price - quantity equals 0).
    expect(filterConditions.ZTEQUAL(filterConditions.ZTSUB(["price", "quantity"]), 0).getJSON()).toEqual(JSON.stringify({
        "operator": "=",
        "operand": { "operator": "-", "operand": ["price", "quantity"] },
        "result": 0
    }));
  });

  /**
   * Test to ensure that the "OR" operation works correctly when valid arguments are provided.
   * The operation should combine multiple conditions and return the correct logical OR representation.
   */
  test('OR operation should work', () => {
    // Define the "OR" operation combining two conditions:
    // 1. price equals 100
    // 2. price greater than 200
    const or = filterConditions.ZTOR([
      filterConditions.ZTEQUAL("price", 100),
      filterConditions.ZTGT(["price", 200]),
    ]);

    // Assert the correct JSON representation of the OR operation
    expect(or.getJSON()).toEqual(JSON.stringify({
        "operator": "||",
        "operand": [
            { "operator": "=", "operand": "price", "result": 100 },
            { "operator": ">", "operand": ["price", 200] }
        ]
    }));
  });


  /**
   * Test to ensure that the "AND" operation works correctly when valid arguments are provided.
   * The operation should combine multiple conditions with a logical AND and return the correct JSON representation.
   */
  test('AND operation should work', () => {
    // Define the "AND" operation combining two conditions:
    // 1. price equals 100
    // 2. quantity greater than 200
    const and = filterConditions.ZTAND([
      filterConditions.ZTEQUAL("price", 100),
      filterConditions.ZTGT(["quantity", 200]),
    ]);

    // Assert the correct JSON representation of the AND operation
    expect(and.getJSON()).toEqual(JSON.stringify({
        "operator": "&&",
        "operand": [
            { "operator": "=", "operand": "price", "result": 100 },
            { "operator": ">", "operand": ["quantity", 200] }
        ]
    }));
  });


  /**
   * Test to ensure that multiple conditions combined with an OR operation work correctly.
   * The test checks a combination of multiple AND conditions inside an OR operation.
   * It validates that the returned JSON structure is correct and reflects the combination of conditions.
   */
  test('multiple combination with or operation should work', () => {
    // Define the OR operation combining multiple AND conditions:
    const conditions = filterConditions.ZTOR([
      // First AND condition: price equals 100 and quantity greater than 200
      filterConditions.ZTAND([
        filterConditions.ZTEQUAL("price", 100),
        filterConditions.ZTGT(["quantity", 200]),
      ]),

      // Second AND condition: price equals 100 and price multiplied by 200 equals 300
      filterConditions.ZTAND([
        filterConditions.ZTEQUAL("price", 100),
        filterConditions.ZTEQUAL(filterConditions.ZTMUL(["price", 200]), 300),
      ])
    ]);

    // Assert the correct JSON representation of the OR operation with multiple AND conditions
    expect(conditions.getJSON()).toEqual(JSON.stringify({
        "operator": "||",
        "operand": [
            { 
                "operator": "&&", 
                "operand": [
                    { "operator": "=", "operand": "price", "result": 100 }, 
                    { "operator": ">", "operand": ["quantity", 200] }
                ]
            },
            { 
                "operator": "&&", 
                "operand": [
                    { "operator": "=", "operand": "price", "result": 100 },
                    { 
                        "operator": "=", 
                        "operand": { "operator": "*", "operand": ["price", 200] }, 
                        "result": 300 
                    }
                ]
            }
        ]
    }));
  });

});
