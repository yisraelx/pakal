import tagOf from '../';

describe(`tagOf()`, () => {
  it(`should be a function`, () => {
    expect(tagOf).toBeFunction();
  });

  it(`should return tag of undefined`, () => {
    expect(tagOf(undefined)).toBe('Undefined');
  });

  it(`should return tag of null`, () => {
    expect(tagOf(null)).toBe('Null');
  });

  it(`should return tag of number`, () => {
    expect(tagOf(NaN)).toBe('Number');
    expect(tagOf(Object(3))).toBe('Number');
  });

  it(`should return tag of boolean`, () => {
    expect(tagOf(true)).toBe('Boolean');
    expect(tagOf(Object(false))).toBe('Boolean');
  });

  it(`should return tag of string`, () => {
    expect(tagOf('foo')).toBe('String');
    expect(tagOf(Object('some'))).toBe('String');
  });

  it(`should return tag of array`, () => {
    expect(tagOf([])).toBe('Array');
  });

  it(`should return tag of object`, () => {
    expect(tagOf({})).toBe('Object');
    expect(tagOf(Object.create(null))).toBe('Object');
  });

  it(`should return tag of function`, () => {
    expect(tagOf((v) => v)).toBe('Function');
    expect(tagOf(function() {
    })).toBe('Function');
  });

  it(`should return custom tag`, () => {
    expect(tagOf({[Symbol.toStringTag]: 'Foo'})).toBe('Foo');
  });
});
