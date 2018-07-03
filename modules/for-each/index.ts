/**
 * @module @pakal/for-each
 * @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import keys from '@pakal/keys';

/**
 * @function
 * @category collection
 * @example
 *
 *  let array: string[] = ['a', 'b', 'c'];
 *
 *  forEach(array, (value: string, index: number, array: string[]) => {
 *      console.log(`${index} = ${value}`);
 *  });
 *
 *  // => '0 = a'
 *  // => '1 = b'
 *  // => '2 = c'
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
 */
function forEach<T extends ArrayLike<any>>(array: T, iteratee?: (value: T[keyof T & number], index: number, array: T) => void): T;
function forEach<T extends object>(object: T, iteratee?: (value: T[keyof T], key: keyof T, object: T) => void): T;
function forEach(collection: any, iteratee: Function = (v => v)) {
    let objectKeys = !Array.isArray(collection) && keys(collection);
    let {length} = objectKeys ? objectKeys : collection;

    for (let index: number = 0; index < length; index++) {
        let key = objectKeys ? objectKeys[index] : index;
        let value = collection[key];
        iteratee(value, key, collection);
    }

    return collection;
}

export default forEach;
