import curry, { __ } from '../';

describe(`curry()`, () => {
  it(`should be a function`, () => {
    expect(curry).toBeFunction();
  });

  it(`should curry function and return string value`, () => {
    let fn = (a, b, c) => 'data';
    let curriedFn = curry(fn);

    expect(curriedFn).toBeFunction();
    expect(curriedFn()(1)(2)()()(3)).toBe('data');
  });

  it(`should curry function and return array of the args`, () => {
    let fn = (...args) => args;
    let curriedFn = curry<any, any, any>(fn, 3);

    expect(curriedFn).toBeFunction();
    expect(curriedFn(1)()(2)()(3)).toEqual([1, 2, 3]);
  });

  it(`should curry the function several times for several different curry and values`, () => {
    let fn = (a, b, c) => [a, b, c];
    let curriedFn = curry(fn);

    expect(curriedFn).toBeFunction();
    expect(curriedFn.length).toBe(3);
    expect(curriedFn(1)()(2)()(3)).toEqual([1, 2, 3]);
    let curriedFn2 = curriedFn(1);
    expect(curriedFn2.length).toBe(2);
    expect(curriedFn2()('b', 'c')).toEqual([1, 'b', 'c']);
    let curriedFn3 = curriedFn2(2);
    expect(curriedFn3.length).toBe(1);
    expect(curriedFn3()()(3)).toEqual([1, 2, 3]);
  });

  it(`should curry several times with placeholder`, () => {
    let fn = (a, b, c, d, e) => [a, b, c, d, e];
    let curriedFn = curry(fn);

    expect(curriedFn).toBeFunction();
    curriedFn(__, __, __, __, 1);
    expect(curriedFn(__, __, __, __, 1)(__, __, __, 2)(__, __, 3)(__, 4)(5)).toEqual([5, 4, 3, 2, 1]);
    expect(curriedFn(1, __, 2, __, 3)(4)()()(5)).toEqual([1, 4, 2, 5, 3]);
    expect(curriedFn(__, 1, __, __, 2)()(4)(__, 5)(3)).toEqual([4, 1, 3, 5, 2]);
  });
});
