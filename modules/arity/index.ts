/*!
 * @module @pakal/arity
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

// functions storage
const FUNCTIONS: {[index: number]: Function} = {};

/**
 * Creates a wrapper function for `fn` with the given `length`.
 *
 * @param fn - The function to wrap.
 * @param length - A length for the wrapped function.
 * @returns Returns A new function with the given `length`, that wrapped `fn`.
 * @example
 *
 *  let fn = arity((...args) => args, 3);
 *
 *  fn('a', 'b', 'c', 'd'); // => ['a', 'b', 'c', 'd']
 *  fn('a', 'b', 'c'); // => ['a', 'b', 'c']
 *  fn('a', 'b'); // => ['a', 'b']
 *  fn.length; // => 3
 *
 */
function arity<TFn extends (...args: any[]) => any>(fn: TFn, length: number = fn.length): ((...args: any[]) => ReturnType<TFn>) | any {
  if (!FUNCTIONS[length]) {
    let params: string[] = [];

    for (let index = 0; index < length; index++) {
      params.push(`p${ index }`);
    }

    FUNCTIONS[length] = new Function(`fn`, `return function (${ params.join(', ') }){ return fn.apply(this, arguments); };`);
  }

  return FUNCTIONS[length](fn);
}

export default arity;
