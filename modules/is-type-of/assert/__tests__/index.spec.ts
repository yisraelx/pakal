import assertTypeOf from '../';

describe(`assertTypeOf()`, () => {
  it(`should be a function`, () => {
    expect(assertTypeOf).toBeFunction();
  });

  it(`should return the given 'value'`, () => {
    expect(assertTypeOf(Math, ['object', 'function'])).toBe(Math);
    expect(assertTypeOf(NaN, 'number')).toBeNaN();
  });

  it(`should throw error'`, () => {
    expect(() => assertTypeOf(55, 'boolean')).toThrow();
    expect(() => assertTypeOf({}, ['function', 'null'])).toThrow();
  });
});
