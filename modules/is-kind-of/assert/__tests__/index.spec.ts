import assertKindOf from '../';

describe(`assertKindOf()`, () => {
  it(`should be a function`, () => {
    expect(assertKindOf).toBeFunction();
  });

  it(`should return the given 'value'`, () => {
    expect(assertKindOf(null, ['null', 'boolean'])).toBeNull();
    expect(assertKindOf('foo', 'string')).toBe('foo');
  });

  it(`should throw error'`, () => {
    expect(() => assertKindOf(v => v, 'string')).toThrow();
    expect(() => assertKindOf(Object(true), ['number', 'string'])).toThrow();
  });
});
