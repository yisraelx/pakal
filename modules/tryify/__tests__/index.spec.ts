import trify from '../';

describe(`trify()`, () => {
  it(`should be a function`, () => {
    expect(trify).toBeFunction();
  });

  it(`should return true`, () => {
    expect(trify(() => {
    })()).toBeTruthy();
    expect(trify(function() {
      return false;
    })()).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(trify(function() {
      throw TypeError();
    })()).toBeFalsy();
  });
});
