/*!
 * @module @pakal/curry
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import arity from '@pakal/arity';

export interface IPlaceholder {
  '@@functional/placeholder': true;
}

export const __: IPlaceholder = {'@@functional/placeholder': true};
type __ = IPlaceholder;

function isPlaceholder(arg) {
  return typeof arg === 'object' && arg['@@functional/placeholder'] === true;
}

export interface CurriedFn<P1, R> {
  (): CurriedFn<P1, R>;

  (p1: P1): R;
}

export interface CurriedFn2<P1, P2, R> {
  (): CurriedFn2<P1, P2, R>;

  (p1: P1): CurriedFn<P2, R>;

  (p1: __, p2: P2): CurriedFn<P1, R>;

  (p1: P1, p2: P2): R;
}

export interface CurriedFn3<P1, P2, P3, R> {
  (): CurriedFn3<P1, P2, P3, R>;

  (p1: P1): CurriedFn2<P2, P3, R>;

  (p1: __, p2: P2): CurriedFn2<P1, P3, R>;

  (p1: P1, p2: P2): CurriedFn<P3, R>;

  (p1: __, p2: __, p3: P3): CurriedFn2<P1, P2, R>;

  (p1: __, p2: P2, p3: P3): CurriedFn<P1, R>;

  (p1: P1, p2: __, p3: P3): CurriedFn<P2, R>;

  (p1: P1, p2: P2, p3: P3): R;
}

export interface CurriedFn4<P1, P2, P3, P4, R> {
  (): CurriedFn4<P1, P2, P3, P4, R>;

  (p1: P1): CurriedFn3<P2, P3, P4, R>;

  (p1: __, p2: P2): CurriedFn3<P1, P3, P4, R>;

  (p1: P1, p2: P2): CurriedFn2<P3, P4, R>;

  (p1: __, p2: __, p3: P3): CurriedFn3<P1, P2, P4, R>;

  (p1: __, p2: P2, p3: P3): CurriedFn2<P1, P4, R>;

  (p1: P1, p2: __, p3: P3): CurriedFn2<P2, P4, R>;

  (p1: P1, p2: P2, p3: P3): CurriedFn<P4, R>;

  (p1: __, p2: __, p3: __, p4: P4): CurriedFn3<P1, P2, P3, R>;

  (p1: __, p2: __, p3: P3, p4: P4): CurriedFn2<P1, P2, R>;

  (p1: __, p2: P2, p3: __, p4: P4): CurriedFn2<P1, P3, R>;

  (p1: P1, p2: __, p3: __, p4: P4): CurriedFn2<P2, P3, R>;

  (p1: __, p2: P2, p3: P3, p4: P4): CurriedFn<P1, R>;

  (p1: P1, p2: __, p3: P3, p4: P4): CurriedFn<P2, R>;

  (p1: P1, p2: P2, p3: __, p4: P4): CurriedFn<P3, R>;

  (p1: P1, p2: P2, p3: P3, p4: P4): R;
}

export interface CurriedFn5<P1, P2, P3, P4, P5, R> {
  (): CurriedFn5<P1, P2, P3, P4, P5, R>;

  (p1: P1): CurriedFn4<P2, P3, P4, P5, R>;

  (p1: __, p2: P2): CurriedFn4<P1, P3, P4, P5, R>;

  (p1: P1, p2: P2): CurriedFn3<P3, P4, P5, R>;

  (p1: __, p2: __, p3: P3): CurriedFn4<P1, P2, P4, P5, R>;

  (p1: __, p2: P2, p3: P3): CurriedFn3<P1, P4, P5, R>;

  (p1: P1, p2: __, p3: P3): CurriedFn3<P2, P4, P5, R>;

  (p1: P1, p2: P2, p3: P3): CurriedFn2<P4, P5, R>;

  (p1: __, p2: __, p3: __, p4: P4): CurriedFn4<P1, P2, P3, P5, R>;

  (p1: __, p2: __, p3: P3, p4: P4): CurriedFn3<P1, P2, P5, R>;

  (p1: __, p2: P2, p3: __, p4: P4): CurriedFn3<P1, P3, P5, R>;

  (p1: P1, p2: __, p3: __, p4: P4): CurriedFn3<P2, P3, P5, R>;

  (p1: __, p2: P2, p3: P3, p4: P4): CurriedFn2<P1, P5, R>;

  (p1: P1, p2: __, p3: P3, p4: P4): CurriedFn2<P2, P5, R>;

  (p1: P1, p2: P2, p3: __, p4: P4): CurriedFn2<P3, P5, R>;

  (p1: P1, p2: P2, p3: P3, p4: P4): CurriedFn<P5, R>;

  (p1: __, p2: __, p3: __, p4: __, p5: P5): CurriedFn4<P1, P2, P3, P4, R>;

  (p1: __, p2: __, p3: __, p4: P4, p5: P5): CurriedFn3<P1, P2, P3, R>;

  (p1: __, p2: __, p3: P3, p4: __, p5: P5): CurriedFn3<P1, P2, P4, R>;

  (p1: __, p2: P2, p3: __, p4: __, p5: P5): CurriedFn3<P1, P3, P4, R>;

  (p1: P1, p2: __, p3: __, p4: __, p5: P5): CurriedFn3<P2, P3, P4, R>;

  (p1: __, p2: __, p3: P3, p4: P4, p5: P5): CurriedFn2<P1, P2, R>;

  (p1: __, p2: P2, p3: __, p4: P4, p5: P5): CurriedFn2<P1, P3, R>;

  (p1: __, p2: P2, p3: P3, p4: __, p5: P5): CurriedFn2<P1, P3, R>;

  (p1: P1, p2: __, p3: __, p4: P4, p5: P5): CurriedFn2<P2, P3, R>;

  (p1: P1, p2: __, p3: P3, p4: __, p5: P5): CurriedFn2<P2, P4, R>;

  (p1: P1, p2: P2, p3: __, p4: __, p5: P5): CurriedFn2<P3, P4, R>;

  (p1: __, p2: P2, p3: P3, p4: P4, p5: P5): CurriedFn<P1, R>;

  (p1: P1, p2: __, p3: P3, p4: P4, p5: P5): CurriedFn<P2, R>;

  (p1: P1, p2: P2, p3: __, p4: P4, p5: P5): CurriedFn<P3, R>;

  (p1: P1, p2: P2, p3: P3, p4: __, p5: P5): CurriedFn<P4, R>;

  (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): R;
}

/**
 *
 * @example
 *
 *  let multiply = (a, b)=> a * b;
 *
 *  let multiplyCurried = curry(multiply);
 *
 *  multiplyCurried()(2)()(4); // => 8
 *
 * @example
 *
 *  let fn = (a, b, c, d, e) => [a, b, c, d, e];
 *
 *  let curriedFn = curry(fn);
 *
 *  curriedFn(__, __, 1, __, 2)(__, 3)(4, 5); // => [4, 3, 1, 5, 2]
 *
 */
function curry<P1, R>(fn: (p1: P1) => R, length?: number): CurriedFn<P1, R>;
function curry<P1, P2, R>(fn: (p1: P1, p2: P2) => R, length?: number): CurriedFn2<P1, P2, R>;
function curry<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, length?: number): CurriedFn3<P1, P2, P3, R>;
function curry<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, length?: number): CurriedFn4<P1, P2, P3, P4, R>;
function curry<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, length?: number): CurriedFn5<P1, P2, P3, P4, P5, R>;
function curry(fn: Function, length: number = fn.length) {

  let next = (previousArgs: any[], count: number) => {
    let nextLength: number = length - count;

    return arity(function() {
      let currentLength: number = arguments.length < length ? arguments.length : length;
      let currentArgs: any[] = [].concat(previousArgs);
      let currentCount: number = count;
      let pos: number = 0;

      for (let i: number = 0; i < currentLength; i++) {
        let arg = arguments[i];

        while (pos < length && !isPlaceholder(currentArgs[pos])) {
          pos++;
        }

        if (!isPlaceholder(arg)) {
          currentCount++;
          currentArgs[pos] = arg;
        }

        pos++;
      }

      return currentCount >= length ? fn.apply(this, currentArgs) : next(currentArgs, currentCount);
    }, nextLength);
  };

  let args = Array.apply(null, Array(length)).map(() => __);

  return next(args, 0);
}

export default curry;
