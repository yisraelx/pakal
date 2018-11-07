/*!
 * @module @pakal/for-each
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import keys from '@pakal/keys';
import { $function, $undefined } from '@pakal/type-of';

/**
 * For each own enumerable properties of `collection` invokes `callback`.
 *
 * @param collection - A collection to iterate on it's properties.
 * @param callback - A function to invokes for each property of `collection` (for `break` the loop return `false`).
 * @param thisArg - A this arg to invokes with `callback`.
 * @returns Returns the given `collection`.
 * @example
 *
 *  let word: string = 'abc';
 *
 *  forEach(word, (char: string, index: number, array: string) => {
 *      console.log(`${index} = ${value}`);
 *  });
 *
 *  // => '0 = a'
 *  // => '1 = b'
 *  // => '2 = c'
 *  // => 'abc'
 *
 * @example
 *
 *  let array: boolean[] = [true, true, false, true, true];
 *
 *  forEach(array, (value: boolean, index: number) => {
 *      console.log(index);
 *      return value;
 *  });
 *
 *  // => 0
 *  // => 1
 *  // => 2
 *  // => array
 *
 * @example
 *
 *  let array: ArrayLike<any> = {length: 2, 1: 'some', foo: 'bar'};
 *
 *  forEach(array, console.log);
 *
 *  // => undefined 0 array
 *  // => 33 'some' array
 *  // => array
 *
 * @example
 *
 *  let object: {[key: string: number]} = {a: 1, b: 2,c: 3};
 *
 *  forEach(object, (value: number, key: string, object: {[key: string: number]}) => {
 *      console.log(`${key} = ${value}`);
 *  });
 *
 *  // => 'a = 1'
 *  // => 'b = 2'
 *  // => 'c = 3'
 *  // => object
 *
 * @example
 *
 *  forEach(); // => undefined
 *  forEach(null); // => null
 *  forEach(true, console.log); // => true
 *
 * @example
 *
 *  let _log = (value: any) => (console.log(value), value);
 *  let collection = {
 *   get foo(){ return _log('bar'); },
 *   get non(){ return _log(false); },
 *   get name(){ return _log('bob'); }
 *  };
 *
 *  forEach(collection);
 *
 *  // => 'foo'
 *  // => false
 *  // => collection
 *
 */
function forEach<T extends ArrayLike<any>>(array?: T, callback?: (value: T[number], index: number, array: T) => any | boolean, thisArg?: any): T;
function forEach<T extends object, K extends keyof T>(object: T, callback?: (value: T[K], key: K, object: T) => any | boolean, thisArg?: any): T;
function forEach(collection?: any, callback?: Function, thisArg?: any): any {
  callback = isTypeOf(callback, $undefined) ? v => v : callback;

  let length: number = collection && collection.length;
  let objectKeys: string[];

  if (isTypeOf(collection, $function) || +length !== length || length < 0) {
    length = (objectKeys = keys(collection)).length;
  }

  for (let index: number = 0; index < length; index++) {
    let key = objectKeys ? objectKeys[index] : index;
    let value = collection[key];

    if (callback.call(thisArg, value, key, collection) === false) {
      break;
    }
  }

  return collection;
}

export default forEach;
