/**
 * @module @pakal/arity
 * @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

// functions storage
const FUNCTIONS: { [index: number]: Function } = {};

/**
 * @function
 * @category function
 * @example
 *
 *  let fn = arity((...args) => args, 3);
 *
 *  fn('a', 'b', 'c', 'd'); // => ['a', 'b', 'c', 'd']
 *  fn('a', 'b', 'c'); // => ['a', 'b', 'c']
 *  fn('a', 'b'); // => ['a', 'b']
 *  fn.length; // => 3
 */
function arity(fn: (...args: any[]) => any, length: number = fn.length): (...args: any[]) => any {

    if (!FUNCTIONS[length]) {
        let params: string[] = [];
        for (var index = 0; index < length; index++) {
            params.push(`p${index}`);
        }

        FUNCTIONS[length] = new Function(`fn`, `return function (${params.join(', ')}){
            return fn.apply(this, arguments);
        };`);
    }

    return FUNCTIONS[length](fn);
}

export default arity;
