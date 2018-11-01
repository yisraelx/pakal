import getGlobal from '../';

describe('getGlobal', () => {
  it('should be a function', () => {
    expect(typeof getGlobal).toBe('function');
  });

  it('should return the value of path in global', () => {
    expect(getGlobal()).toBeObject();
    expect(getGlobal('Object')).toBe(Object);
    expect(getGlobal('Function.prototype')).toBe(Function.prototype);
  });

  it('should return defaultValue if value not exists', () => {
    expect(getGlobal('data')).toBeUndefined();
    expect(getGlobal('data.foo')).toBeUndefined();
    expect(getGlobal('num', 55)).toBe(55);
    expect(getGlobal('Object.foo', 'bar')).toBe('bar');
    expect(getGlobal('a.b.c.d', null, true)).toBeNull();
    expect(getGlobal('a.b.c.d', 33)).toBe(33);
  });

  it('should fill the global path if it empty', () => {
    expect(getGlobal('Math["zero"]', 0, true)).toBe(0);
    expect(getGlobal('Math["zero"]')).toBe(0);

    expect(getGlobal('globalData', {foo: 'bar'}, true).foo).toBe('bar');
    expect(getGlobal<any>('globalData', 44, true).foo).toBe('bar');
    expect(getGlobal<any>('globalData["foo"]', false, true)).toBe('bar');
    expect(getGlobal<any>('globalData.a', 1, true)).toBe(1);
  });

  it('should not override the value of global path if it not empty', () => {
    expect(getGlobal('Function', NaN, true)).toBe(Function);
    expect(getGlobal('Function', Function)).toBe(Function);
    expect(getGlobal('String.prototype', Number.prototype, true)).toBe(String.prototype);

    expect(getGlobal('globalFoo', 'bar', true)).toBe('bar');
    expect(getGlobal('globalFoo', 'bob', true)).toBe('bar');
    expect(getGlobal('globalFoo')).toBe('bar');
  });
});
