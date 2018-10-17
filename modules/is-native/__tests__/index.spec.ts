import isNative from '../';

describe(`isNative()`, () => {
  it(`should be a function`, () => {
    expect(typeof isNative).toBe('function');
  });

  it(`should return true`, () => {
    expect(isNative(Math.abs)).toBeTruthy();
    expect(isNative(Number.isNaN)).toBeTruthy();
    expect(isNative(Function)).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(isNative({toString: () => String})).toBeFalsy();
    expect(isNative(class {
      public static toString() {
        return Number.toString();
      }
    })).toBeFalsy();
    expect(isNative(true)).toBeFalsy();
    expect(isNative(false)).toBeFalsy();
    expect(isNative(null)).toBeFalsy();
    expect(isNative(undefined)).toBeFalsy();
    expect(isNative(NaN)).toBeFalsy();
    expect(isNative(1)).toBeFalsy();
    expect(isNative('foo')).toBeFalsy();
    expect(isNative({})).toBeFalsy();
    expect(isNative([])).toBeFalsy();
    expect(isNative(() => {
    })).toBeFalsy();
    expect(isNative(() => {
    })).toBeFalsy();
    expect(isNative(class {
    })).toBeFalsy();
  });
});
