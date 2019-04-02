/*!
 * @module @pakal/assign
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@pakal/for-each';

/**
 *
 * @see https://mdn.io/Object.assign
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.assign
 * @remarks Unlike `Object.assign` this method will assign `ArrayLike` as `Array`.
 * @param target - The target object.
 * @param sources - The sources objects.
 * @returns Returns `target`.
 * @example
 *
 *  let target = {};
 *  let a = {length: 4,3: 'c', 5: 'e'};
 *  let b = 'foo';
 *  let c = [55, 33];
 *  let d = {1: 'a', foo: 'bar'};"
 *
 *  assign(target, a, b, c, d) === target; // => true
 *  console.log(target);
 *  // => {
 *  //  0: 55
 *  //  1: "a"
 *  //  2: "o"
 *  //  3: "c"
 *  //  foo: "bar"
 *  // }
 *
 * @example
 *
 *  let target = {a: 2, c: 3};
 *  let source = {a: 1, b: 2};
 *
 *  assign(target, source); // => {a: 1, b: 2, c: 3}
 *
 */
function assign<T, S>(t: T, s: S): T & S;
function assign<T, S, S2>(t: T, s: S, s2: S2): T & S & S2;
function assign<T, S, S2, S3>(t: T, s: S, s2: S2, s3: S3): T & S & S2 & S3;
function assign<T, S, S2, S3, S4>(t: T, s: S, s2: S2, s3: S3, s4: S4): T & S & S2 & S3 & S4;
function assign<T, S, S2, S3, S4, S5>(t: T, s: S, s2: S2, s3: S3, s4: S4, s5: S5): T & S & S2 & S3 & S4 & S5;
function assign(target: object, ...sources: object[]): object {
  target = Object(target);

  forEach(sources, (source: object) => {
    forEach(source, (value: any, key: string) => {
      target[key] = value;
    });
  });

  return target;
}

export default assign;
