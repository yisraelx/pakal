/*!
 * @module @pakal/safify
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import arity from '@pakal/arity';
import isTypeOf from '@pakal/is-type-of';
import { $function } from '@pakal/type-of';

/**
 * Create function that wrap `fn` and if `fn` invokes throw exception it will return `failValue`,
 * otherwise it will return invokes results.
 *
 * @param fn - The function to wrap.
 * @param failValue - A value or function that return value, to return if the function call throw exception.
 * @returns Returns A wraps function that invokes `fn`,
 * in case that `fn` invokes throws an error the function will catch the error and will return the `failValue`,
 * otherwise it will return `fn` invokes results.
 * @example
 *
 *  let hasOwnProperty = safify(Object.prototype.hasOwnProperty, false);
 *  hasOwnProperty.call({foo: 'bar'}, 'foo') // => false
 *  hasOwnProperty.call(null, 'foo') // => false
 *
 * @example
 *
 *  function get(object: object, key: PropertyKey): any | undefined {
 *      return object[key];
 *  }
 *
 *  let safeGet = safify(get, undefined);
 *  safeGet([1, 2, 3], 0); // => 1
 *  safeGet([], 0); // => undefined
 *  safeGet(null, 0); // => undefined
 *
 */
function safify<TFn extends (...args: any[]) => any>(fn: TFn, failValue?: TFn | any): TFn {
  return arity(function() {
    try {
      return fn.apply(this, arguments);
    } catch {
      return isTypeOf(failValue, $function) ? failValue.apply(this, arguments) : failValue;
    }
  }, fn.length);
}

export default safify;
