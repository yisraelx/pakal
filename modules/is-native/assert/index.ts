/*!
 * @module @pakal/is-native/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isNative from '@pakal/is-native';

/**
 * Assert that `value` is native function or prototype.
 *
 * @param value - The value to check.
 * @returns Returns `value` if `value` is native.
 * @throws Throws if `value` is not native function or prototype.
 * @example
 *
 *  assertNative('foo'); // => throw
 *  assertNative(function(){}); // => throw
 *  assertNative(true); // => throw
 *  assertNative(Promise.resolve); // => void
 *  assertNative(Function); // => void
 *
 */
// @ts-ignore
declare function assertNative<TValue>(value: TValue): TValue;

// @ts-ignore
let assertNative =
  assertify(isNative, (value) => TypeError(`This value '${ value }' is not native.`));

export default assertNative;
