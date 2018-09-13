import typeOf from '../';

describe(`typeOf()`, () => {
  it(`should be a function`, () => {
    expect(typeOf).toBeFunction();
  });

  it(`should return the type of value`, () => {
    expect(typeOf(true)).toBe('boolean');
    expect(typeOf(false)).toBe('boolean');
    expect(typeOf((v) => v)).toBe('function');
    expect(typeOf(class {
    })).toBe('function');
    expect(typeOf(function() {
    })).toBe('function');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(0)).toBe('number');
    expect(typeOf(1)).toBe('number');
    expect(typeOf(NaN)).toBe('number');
    expect(typeOf(Infinity)).toBe('number');
    expect(typeOf({})).toBe('object');
    expect(typeOf('foo')).toBe('string');
    expect(typeOf(undefined)).toBe('undefined');
    if (typeof Symbol('') === 'symbol') {
      expect(typeOf(Symbol('foo'))).toBe('symbol');
    }
    if (typeof BigInt(1) === 'bigint') {
      expect(typeOf(BigInt(1))).toBe('bigint');
    }
  });
});
