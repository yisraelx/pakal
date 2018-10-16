import isKindOf from '../';

describe(`isKindOf()`, () => {
  it(`should be a function`, () => {
    expect(isKindOf).toBeFunction();
  });

  describe('single type', () => {
    it(`should return true`, () => {
      expect(isKindOf(true, 'boolean')).toBeTruthy();
      expect(isKindOf(null, 'null')).toBeTruthy();
      expect(isKindOf(undefined, 'undefined')).toBeTruthy();
      expect(isKindOf(function() {
      }, 'function')).toBeTruthy();
      expect(isKindOf(function() {
      }, 'object')).toBeTruthy();
      expect(isKindOf(Object('foo'), 'string')).toBeTruthy();
      expect(isKindOf(Object(1), 'object')).toBeTruthy();
      expect(isKindOf(NaN, 'number')).toBeTruthy();
      expect(isKindOf(Object.create(v => v), 'object')).toBeTruthy();
      expect(isKindOf(Object.create({[Symbol.toStringTag]: 'Number'}), 'object')).toBeTruthy();
    });

    it(`should return false`, () => {
      expect(isKindOf('undefined', 'undefined')).toBeFalsy();
      expect(isKindOf(null, 'undefined')).toBeFalsy();
      expect(isKindOf(0, 'undefined')).toBeFalsy();
      expect(isKindOf('1', 'number')).toBeFalsy();
      expect(isKindOf(1, 'string')).toBeFalsy();
      expect(isKindOf({}, 'function')).toBeFalsy();
      expect(isKindOf(null, 'object')).toBeFalsy();
      expect(isKindOf('foo', 'object')).toBeFalsy();
      expect(isKindOf(Object(true), 'function')).toBeFalsy();
      expect(isKindOf(Object.create(v => v), 'function')).toBeFalsy();
      expect(isKindOf(Object.create({[Symbol.toStringTag]: 'Number'}), 'number')).toBeFalsy();
      expect(isKindOf(String.prototype, 'string')).toBeFalsy();
      expect(isKindOf(Number.prototype, 'number')).toBeFalsy();
      expect(isKindOf(Boolean.prototype, 'boolean')).toBeFalsy();
    });
  });

  describe('any type', () => {
    it(`should return true`, () => {
      expect(isKindOf(function() {

      }, ['undefined', 'object'])).toBeTruthy();
      expect(isKindOf(true, ['boolean'])).toBeTruthy();
      expect(isKindOf(77, ['number', 'function'])).toBeTruthy();
      expect(isKindOf(undefined, ['null', 'undefined'])).toBeTruthy();
      expect(isKindOf(Object(1), ['string', 'object'])).toBeTruthy();
      expect(isKindOf(Object('foo'), ['string'])).toBeTruthy();
      expect(isKindOf(Object('foo'), ['string'])).toBeTruthy();
    });

    it(`should return false`, () => {
      expect(isKindOf(undefined, [])).toBeFalsy();
      expect(isKindOf(undefined, ['null'])).toBeFalsy();
      expect(isKindOf(NaN, [])).toBeFalsy();
      expect(isKindOf({}, ['string'])).toBeFalsy();
      expect(isKindOf(null, ['object'])).toBeFalsy();
      expect(isKindOf({}, ['function', 'null'])).toBeFalsy();
      expect(isKindOf('foo', ['object'])).toBeFalsy();
      expect(isKindOf(0, ['null', 'undefined'])).toBeFalsy();
    });
  });
});
