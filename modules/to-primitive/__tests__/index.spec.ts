import toPrimitive from '../';

describe(`toPrimitive()`, () => {
  it(`should be a function`, () => {
    expect(toPrimitive).toBeFunction();
  });

  it(`should not convert primitive with default hint`, () => {
    expect(toPrimitive('')).toBe('');
    expect(toPrimitive('foo')).toBe('foo');
    expect(toPrimitive(1)).toBe(1);
    expect(toPrimitive(0)).toBe(0);
    expect(toPrimitive(NaN)).toBe(NaN);
    expect(toPrimitive(Infinity)).toBe(Infinity);
    expect(toPrimitive(null)).toBe(null);
    expect(toPrimitive(undefined)).toBe(undefined);
    expect(toPrimitive(true)).toBe(true);
    expect(toPrimitive(false)).toBe(false);
  });

  it(`should convert primitive object to primitive with default hint`, () => {
    expect(toPrimitive(Object('foo'))).toBe('foo');
    expect(toPrimitive(Object(1))).toBe(1);
  });

  it(`should convert with hint string`, () => {
    expect(toPrimitive(null, 'string')).toBe('null');
    expect(toPrimitive(undefined, 'string')).toBe('undefined');
    expect(toPrimitive(NaN, 'string')).toBe('NaN');
    expect(toPrimitive(true, 'string')).toBe('true');
    expect(toPrimitive(false, 'string')).toBe('false');
    expect(toPrimitive(Object('foo'), 'string')).toBe('foo');
    expect(toPrimitive(1, 'string')).toBe('1');
    expect(toPrimitive({toString: () => 'foo'}, 'string')).toBe('foo');
    expect(toPrimitive({}, 'string')).toBe('[object Object]');
  });

  it(`should convert with hint number`, () => {
    expect(toPrimitive(-1, 'number')).toBe(-1);
    expect(toPrimitive('-1', 'number')).toBe(-1);
    expect(toPrimitive(0, 'number')).toBe(0);
    expect(toPrimitive(null, 'number')).toBe(0);
    expect(toPrimitive('', 'number')).toBe(0);
    expect(toPrimitive(false, 'number')).toBe(0);
    expect(toPrimitive('0', 'number')).toBe(0);
    expect(toPrimitive(1, 'number')).toBe(1);
    expect(toPrimitive('1', 'number')).toBe(1);
    expect(toPrimitive(true, 'number')).toBe(1);
    expect(toPrimitive(undefined, 'number')).toBeNaN();
    expect(toPrimitive('foo', 'number')).toBeNaN();
    expect(toPrimitive(NaN, 'number')).toBeNaN();
    expect(toPrimitive({}, 'number')).toBeNaN();
    expect(toPrimitive((v) => v, 'number')).toBeNaN();
  });

  it(`should convert date to primitive`, () => {
    let MockDate = {
      valueOf() {
        return 'date';
      },
    };
    expect(toPrimitive(MockDate)).toBe('date');
  });

  it('should convert with Symbol.toPrimitive method', () => {
    class Foo {
      public [Symbol.toPrimitive](hint) {
        switch (hint) {
          case 'string':
            return 'bar';
          case 'number':
            return NaN;
          default:
            return this;
        }
      }

      public toString() {
        return 'bob';
      }

      public valueOf() {
        return 'value';
      }
    }

    let foo = new Foo();

    expect(toPrimitive(foo, 'string')).toBe('bar');
    expect(toPrimitive(foo, 'number')).toBeNaN();
    expect(toPrimitive(foo)).toBe(foo);
    expect(toPrimitive(foo, 'default')).toBe(foo);
  });

  it(`it should not convert object without Symbol.toPrimitive`, () => {
    let object = {};
    expect(toPrimitive(object)).toBe(object);
    let fn = (v) => v;
    expect(toPrimitive(fn)).toBe(fn);
  });

  it('should convert object to string with valueOf method if no toString method', () => {
    expect(toPrimitive(Object.create(null, {
      valueOf: {
        value() {
          return true;
        }
      }
    }), 'string')).toBe('true');
  });

  it('should convert object to number with toString method if no valueOf method', () => {
    expect(toPrimitive({
      toString() {
        return '55';
      }
    }, 'number')).toBe(55);
  });

  it(`should not convert object without Symbol.toPrimitive or valueOf or toString methods`, () => {
    let nullObject = Object.create(null);
    expect(toPrimitive(nullObject)).toBe(nullObject);
  });

  it(`should convert object to number without Symbol.toPrimitive or valueOf or toString methods`, () => {
    let nullObject = Object.create(null);
    expect(toPrimitive(nullObject, 'number')).toBeNaN();
  });

  it(`should convert object to string without Symbol.toPrimitive or valueOf or toString methods`, () => {
    let nullObject = Object.create(null);
    expect(toPrimitive(nullObject, 'string')).toBe('[object Object]');
  });
});
