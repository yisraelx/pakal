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
 * @param target - The target object.
 * @param sources - The sources objects.
 * @returns Returns `target`.
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
