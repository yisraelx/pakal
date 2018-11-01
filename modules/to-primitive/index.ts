/*!
 * @module @pakal/to-primitive
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import safify from '@pakal/safify';
import { $number, $string, $undefined } from '@pakal/type-of';

let Symbol_toPrimitive = (typeof Symbol !== $undefined && Symbol.toPrimitive) || '@@toPrimitive';
let Object$_valueOf = Object.prototype.valueOf;
let Object$_toString = Object.prototype.toString;

export let $default: 'default' = 'default';

const HINTS: {[key: string]: (value: any) => any} = {
  [$string]: safify(String, Object$_toString),
  [$number]: safify(Number, NaN),
  [$default](value: any) {
    return value && (value.valueOf || Object$_valueOf).call(value);
  },
};

/**
 * Convert `value` to primitive.
 *
 * @param value - The value to convert to primitive.
 * @param hint - The hint like `Symbol.toPrimitive` method ['string', 'number', 'default'].
 * @returns Returns the given `target`as primitive.
 * @example
 *
 *  toPrimitive(1); // => 1
 *  toPrimitive(Object('foo')); // => 'foo'
 *  toPrimitive(null, 'default'); // => null
 *  toPrimitive(undefined, 'string'); // => 'undefined'
 *  toPrimitive(true, 'number'); // => 1
 *  toPrimitive({}); // => {}
 *  toPrimitive(v => v, 'default'); // => v => v
 *  toPrimitive({toString(){ return '55';}}, 'number'); // => 55
 *  toPrimitive(Object.create(null, {valueOf: {value(){ return true; }}}), 'string'); // => 'true'
 *  toPrimitive({[Symbol.toPrimitive](hint){return hint === 'string' ? 'foo' : this}}, 'number'); // => 'foo'
 *
 */
function toPrimitive<TValue extends any>(value: TValue, hint?: 'string' | 'number' | 'default'): any {
  return (value && value[Symbol_toPrimitive]) ? value[Symbol_toPrimitive](hint || $default) : HINTS[hint || $default](value);
}

export default toPrimitive;
