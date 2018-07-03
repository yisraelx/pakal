/**
 * @module @pakal/assertify
 * @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import arity from '@pakal/arity';

/**
 * @function
 * @category function
 * @param fn The function to assertify.
 * @param message The throw message or function that create message.
 * @returns Returns A assertified version of `fn`.
 * @example
 *
 *  let isFoo = (value: string) => value === 'bar';
 *
 *  let assertFoo = assertify(isFoo, 'The value is not foo');
 *
 *  assertFoo('bar'); // => void
 *  assertFoo('some'); // => throw Error('The value is not foo')
 *
 * @example
 *
 *  let isEquals = (value: any, other: any) => value === other;
 *
 *  let assertEquals = assertify(isEquals, (value: any, other: any) => {
 *      return `${value} !== ${other}`;
 *  });
 *
 *  assertEquals(true, true); // => void
 *  assertEquals(0, 2); // => throw Error('0 !== 2')
 */
function assertify<P1>(fn: (p1: P1) => boolean, message?: string | ((p1: P1) => string)): (p1: P1) => void;
function assertify<P1, P2>(fn: (p1: P1, p2: P2) => boolean, message?: string | ((p1: P1, p2: P2) => string)): (p1: P1, p2: P2) => void;
function assertify<P1, P2, P3>(fn: (p1: P1, p2: P2, p3: P3) => boolean, message?: string | ((p1: P1, p2: P2, p3: P3) => string)): (p1: P1, p2: P2, p3: P3) => void;
function assertify<P1, P2, P3, P4>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => boolean, message?: string | ((p1: P1, p2: P2, p3: P3, p4: P4) => string)): (p1: P1, p2: P2, p3: P3, p4: P4) => void;
function assertify<P1, P2, P3, P4, P5>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => boolean, message?: string | ((p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => string)): (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => void;
function assertify(fn: (...args: any[]) => boolean, message?: string | ((...args: any[]) => string)): (...args) => void {
    return arity(function () {
        let result = fn.apply(this, arguments);
        if (!result) {
            message = typeof message === 'function' ? message.apply(this, arguments) : message;
            throw new Error(message as string);
        }
    }, fn.length);
}

export default assertify;
