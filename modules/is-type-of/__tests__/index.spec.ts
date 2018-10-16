import isTypeOf from '../';

describe(`isTypeOf()`, () => {
  it(`should be a function`, () => {
    expect(isTypeOf).toBeFunction();
  });

  describe('single type', () => {
    it(`should return true`, () => {
      expect(isTypeOf(true, 'boolean')).toBeTruthy();
      expect(isTypeOf(false, 'boolean')).toBeTruthy();
      expect(isTypeOf((v) => v, 'function')).toBeTruthy();
      expect(isTypeOf(class {
      }, 'function')).toBeTruthy();
      expect(isTypeOf(function() {
      }, 'function')).toBeTruthy();
      expect(isTypeOf(null, 'null')).toBeTruthy();
      expect(isTypeOf(0, 'number')).toBeTruthy();
      expect(isTypeOf(1, 'number')).toBeTruthy();
      expect(isTypeOf(NaN, 'number')).toBeTruthy();
      expect(isTypeOf(Infinity, 'number')).toBeTruthy();
      expect(isTypeOf({}, 'object')).toBeTruthy();
      expect(isTypeOf('foo', 'string')).toBeTruthy();
      expect(isTypeOf(Symbol('foo'), 'symbol')).toBeTruthy();
      expect(isTypeOf(undefined, 'undefined')).toBeTruthy();
      expect(isTypeOf(Object('foo'), 'object')).toBeTruthy();
    });

    it(`should return false`, () => {
      expect(isTypeOf([], 'number')).toBeFalsy();
      expect(isTypeOf(55, 'string')).toBeFalsy();
      expect(isTypeOf(null, 'object')).toBeFalsy();
      expect(isTypeOf({}, 'null')).toBeFalsy();
      expect(isTypeOf('undefined', 'undefined')).toBeFalsy();
      expect(isTypeOf(undefined, 'null')).toBeFalsy();
      expect(isTypeOf(null, 'undefined')).toBeFalsy();
      expect(isTypeOf(Symbol('foo'), 'object')).toBeFalsy();
      expect(isTypeOf(Object(1), 'number')).toBeFalsy();
    });
  });

  describe('any type', () => {
    it(`should return true`, () => {
      expect(isTypeOf(undefined, ['undefined'])).toBeTruthy();
      expect(isTypeOf(null, ['null'])).toBeTruthy();
      expect(isTypeOf(undefined, ['undefined', 'null'])).toBeTruthy();
      expect(isTypeOf('foo', ['string'])).toBeTruthy();
      expect(isTypeOf(null, ['object', 'null'])).toBeTruthy();
      expect(isTypeOf({}, ['object', 'null'])).toBeTruthy();
      expect(isTypeOf(function() {
      }, ['object', 'function'])).toBeTruthy();
      expect(isTypeOf({}, ['object', 'function'])).toBeTruthy();
      expect(isTypeOf(NaN, ['number'])).toBeTruthy();
      expect(isTypeOf(Object('string'), ['string', 'object'])).toBeTruthy();
    });

    it(`should return false`, () => {
      expect(isTypeOf(function() {
      }, ['object', 'undefined'])).toBeFalsy();
      expect(isTypeOf(undefined, [])).toBeFalsy();
      expect(isTypeOf(undefined, ['null'])).toBeFalsy();
      expect(isTypeOf(null, ['undefined'])).toBeFalsy();
      expect(isTypeOf(NaN, ['undefined', 'null', 0 as any, false as any, ''])).toBeFalsy();
      expect(isTypeOf(null, [])).toBeFalsy();
      expect(isTypeOf({}, [])).toBeFalsy();
      expect(isTypeOf(Object(1), ['number'])).toBeFalsy();
      expect(isTypeOf({}, ['null', 'function'])).toBeFalsy();
    });
  });
});
