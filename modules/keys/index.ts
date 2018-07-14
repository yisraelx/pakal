/**
 * @module @pakal/keys
 * @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let hasEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
    enumsBugProps = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ],
    {hasOwnProperty} = Object.prototype;

/**
 * @function
 * @category object
 * @see https://mdn.io/Object.keys
 * @example
 *
 *  let object: {[key: string]: number} = {a: 1, b: 2, c: 3};
 *  let result: string[] = keys(object);
 *  console.log(result); // => ['a', 'b', 'c']
 *
 * @example
 *
 *  let word: string = 'foo';
 *  let result: string[] = keys(word);
 *  console.log(result); // => ['0', '1', '2']
 */
function keys(object: object | ArrayLike<any>): string[] {
    object = typeof object === 'string' ? (object as string).split('') : object;

    let result: string[] = [];

    if (Object(object) !== object) {
        return result;
    }

    for (let key in object) {
        if (hasOwnProperty.call(object, key)) {
            result.push(key);
        }
    }

    if (hasEnumBug) {
        let {length: index} = enumsBugProps;
        while (--index >= 0) {
            let key = enumsBugProps[index];
            if (hasOwnProperty.call(object, key)) {
                result.push(key);
            }
        }
    }

    return result;
}

export default keys;
