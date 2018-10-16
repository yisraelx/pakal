/*!
 * @module @pakal/is-kind-of/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isKindOf from '@pakal/is-kind-of';
import { ITypeKeys } from '@pakal/type-of';

/**
 * Assert that kind of `value` is `kinds`.
 *
 * @param value - The value to check.
 * @param kinds - A kind or kinds array to compare to the kind of the `value`.
 * @returns Returns `value` if the kind of `value` is `kinds`.
 * @throws Throws if the kind of `value` is not `kinds`.
 * @example
 *
 *  assertKindOf(1, []); // throw TypeError
 *  assertKindOf(null, ['undefined', 'object']); // throw TypeError
 *  assertKindOf({}, ['null', 'function']); // throw TypeError
 *  assertKindOf(Object('foo'), ['string', 'null']); // => Object('foo')
 *  assertKindOf(function(){}, ['undefined', 'object']); // function(){}
 *  assertKindOf(true, ['boolean', 'undefined']); // true
 *
 */
// @ts-ignore
declare function assertKindOf<TValue>(value: TValue, kinds: ITypeKeys[] | ITypeKeys): TValue;

// @ts-ignore
let assertKindOf =
  assertify(isKindOf, (value, kinds) => TypeError(`'${ value }' is not kind of '${ kinds }'.`));

export default assertKindOf;
