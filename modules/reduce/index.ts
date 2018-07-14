/**
 * @module @pakal/reduce
 * @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import forEach from '@pakal/for-each';

/**
 * @function
 * @category collection
 * @see https://mdn.io/Array.prototype.reduce
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
 */
function reduce<T extends ArrayLike<any>, R>(array: T, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, array: T) => void, accumulator?: R): R;
function reduce<T extends object, R>(object: T, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => void, accumulator?: R): R;
function reduce(collection: any, iteratee: Function = (v => v), accumulator?: any) {
    let init: boolean = arguments.length > 2;

    forEach(collection, (value, key, collection) => {
        accumulator = init ? iteratee(accumulator, value, key, collection) : (init = true, value);
    });

    return accumulator;
}

export default reduce;
