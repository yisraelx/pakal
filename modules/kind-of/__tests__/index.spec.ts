import kindOf from '../';

describe(`kindOf()`, () => {
  it(`should be a function`, () => {
    expect(kindOf).toBeFunction();
  });

  it(`should return the kind of value`, () => {
    expect(kindOf(null)).toBe('null');
    expect(kindOf(undefined)).toBe('undefined');
    expect(kindOf(1)).toBe('number');
    expect(kindOf(0)).toBe('number');
    expect(kindOf(NaN)).toBe('number');
    expect(kindOf(Object(1))).toBe('number');
    expect(kindOf(Object(0))).toBe('number');
    expect(kindOf(Object(NaN))).toBe('number');
    expect(kindOf(true)).toBe('boolean');
    expect(kindOf(false)).toBe('boolean');
    expect(kindOf(Object(true))).toBe('boolean');
    expect(kindOf(Object(false))).toBe('boolean');
    expect(kindOf('')).toBe('string');
    expect(kindOf('foo')).toBe('string');
    expect(kindOf(Object(''))).toBe('string');
    expect(kindOf(Object('foo'))).toBe('string');
    expect(kindOf(v => v)).toBe('function');
    expect(kindOf(Object.create(v => v))).toBe('object');
    expect(kindOf(String.prototype)).toBe('object');
    expect(kindOf(Number.prototype)).toBe('object');
    expect(kindOf(Boolean.prototype)).toBe('object');
    expect(kindOf({})).toBe('object');
    expect(kindOf(new Date())).toBe('object');
    expect(kindOf({[(Symbol).toStringTag]: 'String'})).toBe('object');
    if (typeof Symbol === 'function') {
      expect(kindOf(Symbol('foo'))).toBe('symbol');
      expect(kindOf(Object(Symbol('foo')))).toBe('symbol');
      expect(kindOf(Symbol.prototype)).toBe('object');
    }
    if (typeof BigInt === 'function') {
      expect(kindOf(BigInt(1))).toBe('bigint');
      expect(kindOf(Object(BigInt(1)))).toBe('bigint');
      expect(kindOf(BigInt.prototype)).toBe('object');
    }
  });
});
