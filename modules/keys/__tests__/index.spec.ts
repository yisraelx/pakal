import keys from '../';

let tests = [
    {object: 1, result: []},
    {object: true, result: []},
    {object: null, result: []},
    {object: void 0, result: []},
    {object: [], result: []},
    {object: {}, result: []},
    {object: [1, 2, 3], result: ['0', '1', '2']},
    {object: {a: 1, b: 2, c: 3}, result: ['a', 'b', 'c']},
    {object: 'abc', result: ['0', '1', '2']},
];

describe(`keys()`, () => {
    tests.forEach(({object, result}) => {
        it(`should be get ${JSON.stringify(object)} and return ${JSON.stringify(result)}`, () => {
            let objectKeys: string[] = keys(object as any);
            expect(objectKeys).toEqual(result);
        });
    });

    it('should return class keys without parent keys', () => {
        class A {
            static color = 'red';
        }
        class B extends A {
            static foo = 'bar';
        }
        let classKeys = keys(B);
        expect(classKeys).toEqual(['foo']);
    });
});
