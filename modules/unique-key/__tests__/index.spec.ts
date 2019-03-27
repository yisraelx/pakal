import { requireWithoutGlobal } from '../../../config/utils/jest';

let {default: uniqueKey} = requireWithoutGlobal('Symbol', '@pakal/unique-key');

describe('uniqueKey()', () => {
  it('should be a function', () => {
    expect(uniqueKey).toBeFunction();
  });

  it('should create unique string', () => {
    let key = uniqueKey('foo');
    expect(key).toBeString();
    expect(key).toMatch(/^@@foo-[a-z0-9]{10}$/);
  });
});
