import forEach from '../';

describe(`forEach()`, () => {
  it('should be a function', () => {
    expect(forEach).toBeFunction();
  });

  it(`should be iteratee on array items`, () => {
    let result = Array(3);
    let array = ['a', 'b', 'c'];
    forEach(array, (value, index, array) => {
      result[index] = value;
      expect(value).toBe(array[index]);
    });

    expect(result).toEqual(array);
  });

  it('should be iterate on array like items', () => {
    let arrayLike = {length: 3, 0: 'a', 1: 'b', 2: 'c', foo: 'bar'};
    let value = '';
    let key = 0;
    expect(forEach(arrayLike, (v, k, a) => {
      value += v;
      key += k;

      expect(value).toBeString();
      expect(key).toBeNumber();
      expect(a).toBe(arrayLike);
    })).toBe(arrayLike);
    expect(value).toBe('abc');
    expect(key).toBe(3);
  });

  it('should be iterate on empty array like items', () => {
    let amount: number = 3;
    let arrayLike = {length: amount, foo: 'bar'};
    expect(forEach(arrayLike, (value: undefined, index: number, {length}) => {
      expect(value).toBeUndefined();
      expect(amount + index).toBe(length);
      amount--;
    })).toBe(arrayLike);
    expect(amount).toBe(0);
  });

  it(`should be iteratee on object properties`, () => {
    let result = {};
    let object = {a: 'A', b: 'B', c: 'C'};
    forEach(object, (value, key, array) => {
      result[key] = value;
      expect(value).toBe(object[key]);
    });

    expect(result).toEqual(object);
  });

  it('should iteratee on function properties', () => {
    let fn = Object.defineProperties(function(a, b, c) {
    }, {foo: {value: 'bar', enumerable: true}, num: {value: 55}});
    let result = {};
    let count = 0;
    expect(forEach(fn, (value, key, collection) => {
      result[key] = value;
      count++;
      expect(collection).toBe(fn);
    })).toBe(fn);
    expect(result).toEqual({foo: 'bar'});
    expect(count).toBe(1);
  });

  it(`should be iteratee on string chars`, () => {
    let result = Array(5);
    let word = 'hello';
    forEach(word, (char, index, word) => {
      result[index] = char;
      expect(char).toBe(word[index]);
    });

    expect(result.join('')).toBe(word);
  });

  it('should not iteratee on empty collection or non iteratee value and return `collection`', () => {
    function callback() {
      throw TypeError;
    }

    expect(forEach(null, callback)).toBeNull();
    expect(forEach(undefined, callback)).toBeUndefined();
    expect(forEach(true as any, callback)).toBeTruthy();
    expect(forEach(false as any, callback)).toBeFalsy();
    expect(forEach(NaN as any, callback)).toBeNaN();
    expect(forEach(-1 as any, callback)).toBe(-1);
    expect(forEach(0 as any, callback)).toBe(0);
    expect(forEach(1 as any, callback)).toBe(1);
    expect(forEach(1 as any, callback)).toBe(1);
    expect(forEach([], callback)).toEqual([]);
    expect(forEach('', callback)).toBe('');
    expect(forEach({}, callback)).toEqual({});
    expect(forEach(callback, callback)).toBe(callback);
    expect(forEach(Object.create({foo: 'bar'}), callback)).toEqual(Object.create({foo: 'bar'}));
    expect(forEach({length: 0}, callback)).toEqual({length: 0});
  });

  it('should iteratee with identity function if `callback` not define and return the collection', () => {
    let count = 0;
    let object = {
      get some() {
        count++;
        return 'some';
      },
      get non() {
        count++;
        return false;
      },
      get other() {
        count++;
        return false;
      },
    };

    expect(forEach(object)).toBe(object);
    expect(count).toBe(2);
  });

  it('should break if iteratee function return false', () => {
    let isOdd = (n) => n % 2 !== 0;
    let array: number[] = [1, 3, 5, 6, 7, 9];
    let count: number = 0;
    forEach(array, (num: number, index: number) => {
      count++;
      return isOdd(num);
    });
    expect(count).toBe(4);
  });

  it('should invokes the callback with the given thisArg', () => {
    let target = [2];
    let result;

    expect(forEach(target, function(v, k, t) {
      result = this + v + t.length;
    }, 3)).toBe(target);

    expect(result).toBe(3 + 2 + 1);
  });
});
