import uniqueId from '../';

describe('uniqueId()', () => {
  it('should be a function', () => {
    expect(uniqueId).toBeFunction();
  });

  it('should create id without prefix', () => {
    let id = uniqueId();
    expect(id).toBeString();
    expect(id).toHaveLength(10);
    expect(id).toMatch(/^[a-z0-9]{10}$/);
  });

  it('should create id with prefix', () => {
    let id = uniqueId('id_');
    expect(id).toBeString();
    expect(id).toHaveLength(13);
    expect(id).toMatch(/^id_[a-z0-9]{10}$/);
  });
});
