/*!
 * @module @pakal/is-native
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $function } from '@pakal/type-of';

let Function$_toString = Function.prototype.toString;

const NATIVE_FUNCTION_RX: RegExp = /{\s*\[native code\]\s*}/;

/**
 * Checks if `value` is native function or prototype.
 *
 * @param value - The value to check.
 * @returns Returns `true` if `value` is native function or prototype, otherwise `false`.
 * @example
 *
 *  isNative(Number); // => true
 *  isNative(Math.floor); // => true
 *  isNative((function(){}).bind(this)); // => true
 *  isNative(String.prototype)); // => true
 *  isNative(Math)); // => false
 *  isNative(Infinity)); // => false
 *  isNative(null); // => false
 *  isNative(() => {}); // => false
 *  isNative({foo: 'bar'}); // => false
 *
 */
function isNative(value: any): boolean {
  return value &&
    (value.constructor && value.constructor.prototype === value && (value = value.constructor),
    isTypeOf(value, $function) && NATIVE_FUNCTION_RX.test(Function$_toString.call(value)));
}

export default isNative;
