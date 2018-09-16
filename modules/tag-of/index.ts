/*!
 * @module @pakal/tag-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let Object$_toString = Object.prototype.toString;
let Symbol_toStringTag = (typeof Symbol !== 'undefined' && Symbol.toStringTag) || '@@toStringTag';

/**
 * Get tag of `value`.
 *
 * @param value A value for the tag.
 * @returns Returns the tag of the `value`.
 * @example
 *
 *  tagOf(); // => 'Undefined'
 *  tagOf({}); // => 'Object'
 *  tagOf('foo'); // => 'String'
 *  tagOf(Object(1)); // => 'Number'
 *  tagOf({[Symbol.toStringTag]: 'Some'}); // => 'Some'
 *
 */
function tagOf(value?: any): string {
  return (value && value[Symbol_toStringTag]) || Object$_toString.call(value).slice(8, -1);
}

export default tagOf;
