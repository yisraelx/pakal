/*!
 * @module @pakal/tryify
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import arity from '@pakal/arity';

/**
 * Creates a wrapper function for `fn`, on invokes the wrapper it will invokes `fn`
 * and returns boolean if `fn` invokes not throw exception.
 *
 * @param fn - The function to wrap.
 * @returns Returns A tryied version of `fn`.
 * @example
 *
 *  tryify(function(){})(); // => true
 *  tryify(() => false)(); // => true
 *  tryify(function(){
 *      throw TypeError
 *  })(); // => false
 *  tryify(Object.prototype.hasOwnProperty).call(null, 'foo'); // => false
 *
 */
function tryify<TArgs extends any[], TFn extends ((...args: TArgs) => any)>(fn: TFn): (...args: TArgs) => boolean {
  return arity(function() {
    try {
      fn.apply(this, arguments);
      return true;
    } catch {
      return false;
    }
  }, fn.length);
}

export default tryify;
