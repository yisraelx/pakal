/*!
 * @module @pakal/type-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export let $bigint: 'bigint' = 'bigint';
export let $boolean: 'boolean' = 'boolean';
export let $function: 'function' = 'function';
export let $null: 'null' = 'null';
export let $number: 'number' = 'number';
export let $object: 'object' = 'object';
export let $string: 'string' = 'string';
export let $symbol: 'symbol' = 'symbol';
export let $undefined: 'undefined' = 'undefined';

export type ITypeKeys =
  typeof $bigint
  | typeof $boolean
  | typeof $function
  | typeof $null
  | typeof $number
  | typeof $object
  | typeof $string
  | typeof $symbol
  | typeof $undefined;

/**
 * Get type of `value`.
 *
 * @resource https://www.ecma-international.org/ecma-262/#sec-typeof-operator
 * @param value - The value to convert to string type.
 * @returns Return A string type of the `value`.
 * @example
 *
 *  typeOf('foo'); // => 'string'
 *  typeOf(Object('foo')); // => 'object'
 *  typeOf(null); // => 'null'
 *  typeOf(v => v); // => 'function'
 *  typeOf(SymbolPolyfill('foo')); // => 'object'
 *  typeOf(BigIntPolyfill(1)); // => 'object'
 *
 */
function typeOf(value: bigint): typeof $bigint;
function typeOf(value: boolean): typeof $boolean;
function typeOf(value: null): typeof $null;
function typeOf(value: number): typeof $number;
function typeOf(value: string): typeof $string;
function typeOf(value: symbol): typeof $symbol;
function typeOf(value: undefined): typeof $undefined;
function typeOf(value: Function): typeof $function;
function typeOf(value: Object): typeof $object;
function typeOf(value: any): ITypeKeys;
function typeOf(value: any): any {
  return value === null ? $null : typeof value;
}

export default typeOf;
