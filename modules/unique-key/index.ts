/*!
 * @module @pakal/unique-key
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import uniqueId from '@pakal/unique-id';

/**
 * Create unique key from `description`,
 * if the env support es2015 `Symbol` it will create unique `Symbol`,
 * otherwise it will create unique string (@@`description`-[0-9a-z]{10}).
 *
 * @param description - A description of the key.
 * @returns Returns unique key from `description`.
 * @example
 *
 *  uniqueKey('some'); // => Symbol('some')
 *
 *  // if env not support es2015 Symbol
 *  uniqueKey('some'); // => '\@\@foo-7dmkls967h'
 *
 *  class Some {
 *      get [uniqueKey('foo')](){
 *          return 'bar';
 *      }
 *  }
 *
 */
// @ts-ignore
declare function uniqueKey(description: string | number): string;

// @ts-ignore
let uniqueKey =
  typeof Symbol === 'function' ?
    Symbol :
    (description: string | number): string => uniqueId(`@@${ description }-`);

export default uniqueKey;
