import assign from '../';

describe(`assign()`, () => {
  it(`should be a function`, () => {
    expect(assign).toBeFunction();
  });

  it(`should be assign sources to target`, () => {
    let target = {a: 1};
    let source = {b: 2};
    let source2 = {c: 3};
    let result = assign(target, source, source2);

    expect(result).toBe(target as any);
    expect(target).toEqual({
      a: 1,
      b: 2,
      c: 3,
    } as any);
    expect(source).toEqual({b: 2});
    expect(source2).toEqual({c: 3});
  });

  it(`should override target props by sources props`, () => {
    let target = {a: 'a', b: 'b', c: 'c'};
    let source = {a: 1, b: 2, d: 4};
    let source2 = {b: 'B', d: 'D', e: 'E'};
    let result = assign(target, source, source2);

    expect(result).toBe(target as any);
    expect(target).toEqual({
      a: 1,
      b: 'B',
      c: 'c',
      d: 'D',
      e: 'E',
    } as any);
  });

  it(`should assign only the props in the root level`, () => {
    let target = {a: [1, 2, 3], b: {foo: 'bar', color: 'red'}, name: 'bob', number: 55};
    let source = {a: ['a', 'b', 'c', 'd'], b: {animal: 'dog'}, name: 'john'};
    let result = assign(target, source);

    expect(result).toBe(target as any);
    expect(target).toEqual({
      a: ['a', 'b', 'c', 'd'],
      b: {animal: 'dog'},
      name: 'john',
      number: 55,
    } as any);
  });

  it('should replace nil target with empty object', () => {
    let source = {foo: 'bar'};
    let result = assign(null, source);
    expect(result).toEqual(source);
    expect(result).not.toBe(source);
  });

  it('should not assign non object sources', () => {
    let target = {foo: 'bar'};
    let result = assign(target, null, 1, true);
    expect(result).toBe(target);
    expect(result).toEqual(target);
  });

  it('should assign class properties without parent properties', () => {
    class A {
      public static car = 'jeep';
    }

    class B extends A {
      public static animal = 'dog';
    }

    let result = assign({}, B);
    expect(result).toEqual({animal: 'dog'});
  });

  it('should assign ArrayLike as Array', () => {
    let target = {};
    let a = {length: 3, 2: 'b'};
    let b = 'hi';
    let c = [33];
    let d = class {
      static foo = 'bar';

      constructor(a, b, c, d, e) {
      }
    };
    let result = assign(target, a, b, c, d);

    expect(result).toBe(target);
    expect(target).toEqual({0: 33, 1: 'i', 2: 'b', foo: 'bar'});
  });
});
