let keys = require('../').default;
jest.resetModules();
let Object_keys = Object.keys;
delete Object.keys;
let _keys = require('../').default;
Object.keys = Object_keys;

describe.each([['keys', keys], ['_keys', _keys]])('%s', (label, keys) => {
  it('should be a function', () => {
    expect(keys).toBeFunction();
  });

  it('should return empty array for nil target', () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
  });

  it('should return keys of object', () => {
    expect(keys({a: 1, b: 2, c: 3})).toEqual(['a', 'b', 'c']);
  });

  it('should return keys of array', () => {
    expect(keys([1, 2, 3])).toEqual(['0', '1', '2']);
  });

  it('should return keys of string', () => {
    expect(keys('abc')).toEqual(['0', '1', '2']);
  });

  it('should return only enumerable keys', () => {
    expect(keys(Object.defineProperties({foo: 'bar'}, {name: {value: 'bob'}}))).toEqual(['foo']);
  });

  it('should return only own keys', () => {
    expect(keys(Object.setPrototypeOf({color: 'red'}, {name: 'alice'}))).toEqual(['color']);
  });
});
