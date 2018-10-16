/*!
 * @module @pakal/is-type-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import typeOf, {
  $bigint,
  $boolean,
  $function,
  $null,
  $number,
  $object,
  $string,
  $symbol,
  $undefined,
  ITypeKeys,
} from '@pakal/type-of';

/**
 * Checks if type of `value` is `types`.
 *
 * @see https://mdn.io/typeof
 * @param value The value to check.
 * @param types A type or types array to compare to the type of the `value`.
 * @returns Returns `true` if the type of `value` is `types`, otherwise `false`.
 * @example
 *
 *  isTypeOf('foo', 'string'); // => true
 *  isTypeOf(null, 'null'); // => true
 *  isTypeOf(Object(1), 'object'); // => true
 *  isTypeOf(null, 'object'); // => false
 *  isTypeOf(Object(true), 'boolean'); // => false
 *  isTypeOf(v => v, 'object') // => false
 *
 *  isTypeOf(class {}, ['undefined', 'function']) // => true
 *  isTypeOf({}, ['object', 'undefined']) // => true
 *  isTypeOf(1, []) // => false
 *  isTypeOf(null, ['undefined', 'number']) // => false
 *
 */
function isTypeOf(value: any, type: typeof $bigint): value is bigint;
function isTypeOf(value: any, type: typeof $boolean): value is boolean;
function isTypeOf(value: any, type: typeof $function): value is Function;
function isTypeOf(value: any, type: typeof $null): value is null;
function isTypeOf(value: any, type: typeof $number): value is number;
function isTypeOf(value: any, type: typeof $object): value is Object;
function isTypeOf(value: any, type: typeof $string): value is string;
function isTypeOf(value: any, type: typeof $symbol): value is symbol;
function isTypeOf(value: any, type: typeof $undefined): value is undefined;
function isTypeOf(value: any, types: ITypeKeys[] | ITypeKeys): boolean;
function isTypeOf(value: any, types: any): boolean {
  let typeOfValue: string = typeOf(value);
  return typeOfValue === types || (Array.isArray(types) && types.indexOf(typeOfValue) > -1);
}

export default isTypeOf;
