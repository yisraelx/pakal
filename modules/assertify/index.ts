/*!
 * @module @pakal/assertify
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import arity from '@pakal/arity';
import typeOf, { $function, $number, $object } from '@pakal/type-of';

/**
 * Creates a wrapper function for `fn`, on invokes the wrapper it will invokes `fn` and throw if `fn` invokes result is `false`.
 *
 * @param fn - A validate function that returns boolean valid or not (if not it will throw `message`).
 * @param message - A message to throw if `fn` invokes result `false`, can be message or fn that create message.
 * @param returns - A value to returns if `fn` invokes result is `true`,
 *  can be `false` to returns void or index to returns args[index] or fn that returns value to returns.
 * @returns Returns A assertified version of `fn`.
 * @example
 *
 *  let isFoo = (value: string) => value === 'bar';
 *
 *  let assertFoo = assertify(isFoo, 'The value is not foo');
 *
 *  assertFoo('bar'); // => 'bar'
 *  assertFoo('some'); // throw Error('The value is not foo')
 *
 * @example
 *
 *  let isEquals = (value: any, other: any) => value === other;
 *
 *  let assertEquals = assertify(isEquals, (value: any, other: any) => {
 *      return `${value} !== ${other}`;
 *  }, false);
 *
 *  assertEquals(true, true); // => void
 *  assertEquals(0, 2); // throw Error('0 !== 2')
 *
 * @example
 *
 *  let isString = (value: any) => typeof value === 'string';
 *  let assertString = assertify(isString, (value) => TypeError(`type of '${value}' is not string.`), 0);
 *
 *  assertString('some'); // => 'some'
 *  assertString(true); // throw TypeError(`type of 'true' is not string`)
 *
 * @example
 *
 *  let contains = (items: any[], value: any) => items.indexOf(value) > -1;
 *  let assertContains = assertify(contains, (items, value) => ({message: (`'${value}' not in ['${items.join(', ')}']`}), contains), 1);
 *
 *
 *  assertContains(['red', 'black', 'green'], 'black'); // => 'black'
 *  assertContains(['tea', 'beer'], 'coffee'); // throw {message: `'coffee' not in ['tea', 'beer']`}
 *
 */
function assertify<TFn extends (...args: any[]) => boolean, TReturns extends boolean>(fn: TFn, message?: any | {message: any} | ((...args: Parameters<TFn>) => any | {message: any}), returns?: TReturns): (...args: Parameters<TFn>) => TReturns extends false ? void : Parameters<TFn>[0];
function assertify<TFn extends (...args: any[]) => boolean, TArgIndex extends number>(fn: TFn, message?: any | {message: any} | ((...args: Parameters<TFn>) => any | {message: any}), returns?: TArgIndex): (...args: Parameters<TFn>) => Parameters<TFn>[TArgIndex];
function assertify<TFn extends (...args: any[]) => boolean, TResult>(fn: TFn, message?: any | {message: any} | ((...args: Parameters<TFn>) => any | {message: any}), toResult?: (...args: Parameters<TFn>) => TResult): (...args: Parameters<TFn>) => TResult;
function assertify<TReturnFn extends (...args: any[]) => any>(fn: (...args: Parameters<TReturnFn>) => boolean, message?: any | {message: any} | ((...args: Parameters<TReturnFn>) => any | {message: any}), toResult?: TReturnFn): TReturnFn;
function assertify<TFn extends Function>(fn: TFn, message?: any | {message: any} | Function, returns?: number | boolean | Function): Function {
  return arity(function(value) {
    let result = fn.apply(this, arguments);

    if (!result) {
      message = typeOf(message) === $function ? message.apply(this, arguments) : message;
      throw (typeOf(message) === $object && 'message' in message) ? message : Error(message);
    }

    if (returns !== false) {
      return typeOf(returns as any) === $function ? (returns as Function).apply(this, arguments) : arguments[(typeOf(returns as any) === $number ? returns : 0) as number];
    }
  }, fn.length);
}

export default assertify;
