/*!
 * @module @pakal/is-kind-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import kindOf from '@pakal/kind-of';
import typeOf, { $function, $object, ITypeKeys, } from '@pakal/type-of';

/**
 * Checks if kind of `value` is `kinds`.
 *
 * @remarks if `Symbol` or `BigInt` is not native (polyfill), the kind will base on `Symbol.toStringTag` property,
 * if `value` not has `Symbol.toStringTag` property it's will be checks if 'object' in kinds.
 * @param value - The value to check.
 * @param kinds - A kind or kinds array to compare to the kind of the `value`.
 * @returns Returns `true` if the kind of `value` is `kinds`, otherwise `false`.
 * @example
 *
 *  isKindOf(null, 'undefined'); // => false
 *  isKindOf(undefined, 'null'); // => false
 *  isKindOf({}, 'function'); // => false
 *  isKindOf(true, 'object'); // => false
 *  isKindOf(null, 'object'); // => false
 *  isKindOf(String.prototype, 'string'); // => false
 *  isKindOf(Object.freeze({[Symbol.toStringTag]: 'String'}), 'string'); // => false
 *  isKindOf(function (){}, 'object'); // => true
 *  isKindOf(class {}, 'function'); // => true
 *  isKindOf(Object('foo'), 'string'); // => true
 *  isKindOf(Object(1), 'object'); // => true
 *
 *  isKindOf(false, []); // => false
 *  isKindOf({}, ['null', 'function']); // => false
 *  isKindOf(class {}, ['object', 'undefined']); // => true
 *  isKindOf(Object(NaN), ['object', 'undefined']); // => true
 *
 */
function isKindOf(value: any, kinds: ITypeKeys[] | ITypeKeys): boolean {
  kinds = Array.isArray(kinds) ? kinds : [kinds];
  let typeOfValue: ITypeKeys = typeOf(value);
  let kindOfValue: ITypeKeys;
  return kinds.indexOf(typeOfValue) > -1 ||
    (typeOfValue !== (kindOfValue = typeOfValue === $function ? $object : kindOf(value)) &&
      kinds.indexOf(kindOfValue) > -1);
}

export default isKindOf;
