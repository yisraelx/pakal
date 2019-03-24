import arity from '../';

describe(`arity()`, () => {
  it(`should be a function`, () => {
    expect(arity).toBeFunction();
  });

  it(`should change create new function and with that pass length and execute and return`, () => {
    let fn = (a, b, c) => true;
    let arityFn = arity(fn, 0);

    expect(arityFn.length).toBe(0);
    expect(arityFn()).toBe(true);
    expect(arityFn(0, 1, 2)).toBe(true);
  });

  it(`should execute and pass all args and execute and return`, () => {
    let fn = (...args) => args;
    let arityFn = arity(fn, 3);

    expect(arityFn.length).toBe(3);
    expect(arityFn('a', 'b', 'c', 'd')).toEqual(['a', 'b', 'c', 'd']);
    expect(arityFn('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
    expect(arityFn('a', 'b')).toEqual(['a', 'b']);
  });

  it('should arity without length', () => {
    let arityFn = arity((a, b, c) => {
    });
    expect(arityFn.length).toBe(3);
  });

  it('should call on object scope', () => {
    let object = {
      num: 2,
      multiply(...args) {
        return args.map((v) => v * this.num);
      },
    };

    object.multiply = arity(object.multiply, 3);
    let result: number[] = object.multiply(1, 2, 3);
    expect(result).toEqual([2, 4, 6]);
  });
});
