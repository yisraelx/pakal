/*!
 * @module @pakal/is-type-of/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isTypeOf from '@pakal/is-type-of';
import { ITypeKeys } from '@pakal/type-of';

/**
 * Assert that type of `value` is `types`.
 *
 * @param value - The value to check.
 * @param types - A type or types array to compare to the type of the `value`.
 * @returns Returns `value` if the type of `value` is `types`.
 * @throws Throws if the type of `value` is not `types`.
 * @example
 *
 *  assertTypeOf(1, 'number'); // => 1
 *  assertTypeOf(undefined, 'undefined'); // => undefined
 *  assertTypeOf(Object('foo'), 'string'); // throw TypeError
 *  assertTypeOf(null, 'object'); // throw TypeError
 *
 *  assertTypeOf(true, []); // throw TypeError
 *  assertTypeOf({}, ['null']); // throw TypeError
 *  assertTypeOf(function(){}, ['object', 'null', 'undefined']); // throw TypeError
 *  assertTypeOf(Symbol('foo'), ['undefined', 'string', 'symbol']); // => Symbol('foo')
 *  assertTypeOf({}, ['object', 'null']); // => {}
 *
 */
// @ts-ignore
declare function assertTypeOf<TValue>(value: TValue, types: ITypeKeys[] | ITypeKeys): TValue;

// @ts-ignore
let assertTypeOf =
  assertify(isTypeOf, (value, types) => TypeError(`'${ value }' is not type of '${ types }'.`));

export default assertTypeOf;
