/*!
 * @module @pakal/reduce
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@pakal/for-each';

/**
 *
 * @example
 *
 *  let array: string[] = [1, 2, 3, 4, 5];
 *
 *  let result: number[] = reduce(array, (result: number[], value: string, index: number, array: string[]) => {
 *      if(value % 2 === 0){
 *          result.push(value);
 *      }
 *      return result;
 *  }, []);
 *
 *  console.log(result); // => [2, 4]
 *
 * @example
 *
 *  let object: {[key: string: number]} = {a: 1, b: 2, c: 3};
 *
 *  let result: number = reduce(object, (value: number, key: string, object: {[key: string: number]}) => {
 *      return result + value;
 *  });
 *
 *  console.log(result); // => 6
 *
 * @example
 *
 *  reduce('abc',(result: number, char: string) => {
 *    return result + char.charCodeAt(0);
 *  }, 0); // => 294
 *
 * @example
 *
 *  reduce({length: 3, 0: 1, 1: 2, 2: 3}, (result: number, num: number, index: number) => {
 *    return result + (num * index);
 *  }); // => 9
 *
 */
function reduce<T extends ArrayLike<any>, R>(array: T, callback?: (accumulator: R, value: T[keyof T & number], index: number, array: T) => void, accumulator?: R): R;
function reduce<T extends object, R>(object: T, callback?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => void, accumulator?: R): R;
function reduce(collection: any, callback: any = ((v) => v), accumulator?: any): any {
  let init: boolean = arguments.length > 2;

  forEach(collection, (value, key) => {
    accumulator = init ? callback(accumulator, value, key, collection) : (init = true, value);
  });

  return accumulator;
}

export default reduce;
