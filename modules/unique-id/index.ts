/*!
 * @module @pakal/unique-id
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * Create unique string id with `prefix` and 10 random chars.
 *
 * @param prefix - A string prefix to add to start of the id.
 * @returns Returns unique string id (`prefix`[a-z0-9]{10}).
 * @example
 *
 *  uniqueId(); // => '7sj9x8enjd'
 *  uniqueId('id_'); // => 'id_t3jusro55p'
 *
 */
function uniqueId(prefix?: string): string {
  let randomChars: string = Math.random().toString(36).slice(2, 12);
  return `${ prefix || '' }${ randomChars }`;
}

export default uniqueId;
