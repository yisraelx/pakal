/*!
 * @module @pakal/kind-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import tagOf from '@pakal/tag-of';
import typeOf, { $bigint, $boolean, $function, $number, $object, $string, $symbol, ITypeKeys } from '@pakal/type-of';

let _valueOf = (value, lowerTag) => value.valueOf && typeOf(value.valueOf()) === lowerTag;
let _polyfillBigInt = (value) => value === value.valueOf() && /^[0-9]+$/.test(value);
let _polyfillSymbol = (value) => value === value.valueOf() && typeOf(value.constructor.for) === $function;

const KINDS_HELPERS: {[type: string]: Function} = {
  [$bigint]: (typeof BigInt === $function && typeOf(BigInt(1)) === $bigint) ? _valueOf : _polyfillBigInt,
  [$boolean]: _valueOf,
  [$number]: _valueOf,
  [$string]: _valueOf,
  [$symbol]: (typeof Symbol === $function && typeOf(Symbol('foo')) === $symbol) ? _valueOf : _polyfillSymbol
};

/**
 * Get kind of `value`.
 *
 * @remarks if `Symbol` or `BigInt` is not native (polyfill), the kind will base on `Symbol.toStringTag` property,
 * if `value` not has `Symbol.toStringTag` property it's will be returns that the kind is 'object'.
 * @param value - The value to convert to string kind.
 * @returns Return A string kind of the `value`.
 * @example
 *
 *  kindOf(null); // => 'null'
 *  kindOf(class {}); // => 'function'
 *  kindOf(NaN); // => 'number'
 *  kindOf(Object('foo')); // => 'string'
 *  kindOf(String.prototype); // => 'object'
 *  kindOf(Object.create(v => v)); // => 'object'
 *  kindOf(Object.freeze({[Symbol.toStringTag]: 'Number'})); // => 'object'
 *
 *  // In env that not have native support.
 *  let fooSym = Symbol('foo');
 *  typeof fooSym; // => 'object'
 *  kindOf(fooSym); // => 'symbol'
 *  let bigNum = BigInt(1);
 *  typeof bigNum; // => 'object'
 *  kindOf(bigNum); // => 'bigint'
 *
 * @example
 *
 *  let iframe = document.createElement('iframe');
 *  document.body.appendChild(iframe);
 *  let {String: IFrameString} = iframe.contentWindow;
 *  kindOf(new IFrameString('foo')); // => 'string'
 *
 */
function kindOf(value?: any): ITypeKeys {
  let typeOfValue: ITypeKeys = typeOf(value);
  let lowerTag: ITypeKeys;

  return (typeOfValue === $object &&
    value.constructor && value !== value.constructor.prototype &&
    KINDS_HELPERS[lowerTag = tagOf(value).toLowerCase() as ITypeKeys] && KINDS_HELPERS[lowerTag](value, lowerTag) &&
    lowerTag) || typeOfValue;
}

export default kindOf;
