import assertNative from '../';

describe(`assertNative()`, () => {
  it(`should be a function`, () => {
    expect(assertNative).toBeFunction();
  });

  it(`should return the given 'value'`, () => {
    expect(assertNative(Object)).toBe(Object);
    expect(assertNative(String.prototype)).toBe(String.prototype);
  });

  it(`should throw error'`, () => {
    expect(() => assertNative(function() {
    })).toThrow();
    expect(() => assertNative({})).toThrow();
  });
});
