/*!
 * @module @pakal/keys
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let Object$_hasOwnProperty = Object.prototype.hasOwnProperty;
let Object_keys = Object.keys;
let Object_keys_any: typeof keys = Object_keys && ((target: any): string[] => Object_keys(Object(target)));

const HAS_DONT_ENUM_BUG: boolean = !({toString: null}).propertyIsEnumerable('toString');
const OBJECT_PROTOTYPE_KEYS: string[] = [
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'constructor',
];

/**
 * Get `target` own enumerable property names.
 *
 * @see https://mdn.io/Object.keys
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.keys
 * @resource https://web.archive.org/web/20150905125617/https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute
 * @resource https://mdn.io/Data_structures#Properties
 * @param target - A target to get the keys.
 * @returns Returns array of `target` own enumerable property names.
 * @example
 *
 *  keys(); // => []
 *  keys(null); // => []
 *  keys(NaN); // => []
 *  keys(true); // => []
 *  keys({a: 1, b: 2, c: 3}); // => ['a', 'b', 'c']
 *  keys('foo'); // => ['0', '1', '2']
 *  keys(Object.defineProperties({foo: 'bar'}, {color: {value: 'red'}})); // => ['foo']
 *  keys(Object.setPrototypeOf({name: 'bob'}, {num: 69})); // => ['name']
 *
 */
function keys(target: any): string[] {
  let result: string[] = [];

  for (let key in target) {
    if (Object$_hasOwnProperty.call(target, key)) {
      result.push(key);
    }
  }

  if (HAS_DONT_ENUM_BUG) {
    for (let key of OBJECT_PROTOTYPE_KEYS) {
      if (Object$_hasOwnProperty.call(target, key)) {
        result.push(key);
      }
    }
  }

  return result;
}

// @ts-ignore
keys = Object_keys_any || keys;

export default keys;
