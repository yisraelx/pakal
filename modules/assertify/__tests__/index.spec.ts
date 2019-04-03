import assertity from '../';

describe(`assertity()`, () => {
  it(`should be a function`, () => {
    expect(assertity).toBeFunction();
  });

  it(`should assert and throw message`, () => {
    let isString = (value) => typeof value === 'string';
    let assertString = assertity(isString, 'The value is not string.');

    expect(assertString).toBeFunction();
    expect(() => {
      assertString(777);
    }).toThrowError('The value is not string');

    expect(assertString(':)')).toBe(':)');
  });

  it(`should assert with params and throw fn message`, () => {
    let toBe = (that: any, other: any) => that === other;
    let assertToBe = assertity(toBe, (that: any, other: any) => {
      return `${ that } !== ${ other }`;
    });

    expect(assertToBe).toBeFunction();
    expect(() => {
      assertToBe(1, 2);
    }).toThrowError('1 !== 2');

    expect(assertToBe(null, null)).toBeNull();
  });

  it('should invokes `fn` with thisArs ', () => {
    let object = {
      num: 55,
      isNum(num) {
        return num === this.num;
      },
    };

    object.isNum = assertity(object.isNum, 'is not num') as any;

    expect(object.isNum).toBeFunction();
    expect(object.isNum(55)).toBe(55);
    expect(() => {
      object.isNum(33);
    }).toThrowError('is not num');
  });

  it('should throw `message` string', () => {
    expect(() => assertity((value) => value === 'cool', 'is not cool', false)('not cool')).toThrowError('is not cool');
  });

  it('should throw `message` object', () => {
    expect(() => assertity((data) => data !== data, {message: 'cool'}, 0)('non')).toThrowError('cool');
  });

  it('should throw `message` fn invokes result string', () => {
    expect(() => assertity((value) => value === 'cool', 'is not cool')('not cool')).toThrowError('is not cool');
  });

  it('should throw `message` fn invokes result object', () => {
    expect(() => assertity(function(key) {
      return key in this;
    }, function(key) {
      return `'${ key }' not in '${ this }'`;
    }, true).call({
      name: 'some',
      toString() {
        return `{ ${ this.name } }`;
      },
    }, 'foo')).toThrowError(`'foo' not in '{ some }'`);
  });

  it('should return by default args[0]', () => {
    expect(assertity((num: number) => true, null)(55)).toBe(55);
  });

  it('should return args[0] if `returns` is true', () => {
    expect(assertity((n: number, o: number) => n > o, null, true)(0.5, 0)).toBe(0.5);
  });

  it('should return void if `returns` is false ', () => {
    expect(assertity((v) => v, null, false)(true)).toBeUndefined();
  });

  it('should return args[`returns`] if `returns` is number ', () => {
    let object = {
      ok: true,
      fn: assertity(function(...args) {
        return this.ok;
      }, null, 1),
    };

    expect(object.fn).toBeFunction();
    expect(object.fn('a', 'b')).toBe('b');
  });

  it('should return `returns` fn invokes result', () => {
    expect(assertity((...args) => true, null, (a, b, c) => a + b + c)(1, 2, 3)).toBe(6);
  });
});
