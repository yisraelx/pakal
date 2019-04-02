/*!
 * @module @pakal/get-global
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let _Function: any = (function() {
}).constructor;

/**
 * Get value of path in the global object.
 *
 * @param globalPath - The path of the value in the global.
 * @param defaultValue - The default value to returns if the value in the globalPath is nil.
 * @param toFill - If to fill `globalPath` with `defaultValue`, only if the value of `globalPath` is nil.
 * @returns Returns the value of the path in the global object if the value is not nil it, otherwise `defaultValue`.
 * @example
 *
 *  // browser
 *  getGlobal() === window; // => true
 *  // worker
 *  getGlobal() === self; // => true
 *  // nodejs
 *  getGlobal() === global; // => true
 *
 *  getGlobal('Object') === Object; // => true
 *  getGlobal('NaN'); // => NaN
 *  getGlobal('String.prototype') === String.prototype; // => true
 *  getGlobal('Math.foo', 'bar'); // => 'bar'
 *  getGlobal('Math.zero', 0, true); // => 0
 *  getGlobal('Math').zero; // => 0
 *
 * @example
 *
 *  getGlobal('color'); // => undefined
 *  typeof color; // => undefined
 *  getGlobal('color', 'green'); // => 'green'
 *  typeof color; // => undefined
 *  getGlobal('color', 'blue', true); // => 'blue'
 *  color === 'blue'; // => true
 *  getGlobal('color', 'red', true); // => 'blue'
 *  color === 'blue'; // => true
 *  color = 'yellow';
 *  getGlobal('color', 'black', true); // => 'yellow'
 *
 * @example
 *
 *  getGlobal('data'); // => undefined
 *  getGlobal('data', {name: 'bob'}).name; // => 'bob'
 *  getGlobal('data'); // => undefined
 *  getGlobal('data.name', 'david', true); // => 'david'
 *  getGlobal('data'); // => 'undefined'
 *  getGlobal('data', {name: 'alice'}, true).name; // => 'alice'
 *  getGlobal('data.name'); // => 'alice'
 *  getGlobal('data.name', 'john', true).name; // => 'alice'
 *  getGlobal('data').name; // => 'alice'
 *  getGlobal('data').name = 'moshe';
 *  getGlobal('data.name', 'steve', true); // => 'moshe'
 *
 */
function getGlobal<TValue extends any>(globalPath?: string, defaultValue?: TValue, toFill?: boolean): TValue {
  globalPath = globalPath || 'this';
  let accessor: (value: TValue) => TValue = new _Function('v', `return typeof ${ globalPath } !== 'undefined' ? ${ globalPath } : ${ toFill ? `(${ globalPath } = v)` : 'v' };`);

  try {
    return accessor(defaultValue);
  } catch {
    return defaultValue;
  }
}

export default getGlobal;
