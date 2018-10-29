import safify from '../';

describe(`safify()`, () => {
  it(`should be a function`, () => {
    expect(safify).toBeFunction();
  });

  it(`should wraps function and return on error result of failValue function`, () => {
    let safeObjectCreate = safify(Object.create, () => ({}));

    expect(safeObjectCreate.length).toBe(Object.create.length);
    expect(safeObjectCreate('foo' as any)).toEqual({});
    expect(safeObjectCreate([])).toBeInstanceOf(Array);
  });

  it(`should wraps function and return on error failValue value`, () => {
    function has(object: object, key: PropertyKey): boolean {
      return key in object;
    }

    let safeHas = safify(has, false);
    expect(safeHas.length).toBe(2);
    expect(safeHas('foo' as any, 'toString')).toBeFalsy();
    expect(safeHas([], 0)).toBeFalsy();
    expect(safeHas({color: 'rad'}, 'color')).toBeTruthy();
  });

  it(`should wraps prototype function `, () => {
    let safeIsPrototypeOf = safify(Object.prototype.isPrototypeOf, false);

    expect(safeIsPrototypeOf.length).toBe(Object.prototype.isPrototypeOf.length);
    expect(safeIsPrototypeOf.call(null, null)).toBeFalsy();
    expect(safeIsPrototypeOf.call(Function.prototype, Object.prototype)).toBeFalsy();
    expect(safeIsPrototypeOf.call(RegExp.prototype, /s/)).toBeTruthy();
  });
});
