import uniqueKey from '../';

describe('uniqueKey()', () => {
  it('should be a function', () => {
    expect(uniqueKey).toBeFunction();
  });

  if (Symbol) {
    it('should create symbol', () => {
      let key = uniqueKey('foo');
      expect(key.toString()).toBe('Symbol(foo)');
    });
  } else {
    it('should create unique string', () => {
      let key = uniqueKey('foo');
      expect(key).toBeString();
      expect(key).toMatch(/^@@foo-[a-z0-9]{10}$/);
    });
  }
});
