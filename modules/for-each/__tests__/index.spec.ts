import forEach from '../';

describe(`forEach()`, () => {
    it(`should be iteratee on array items`, () => {
        let result = Array(3);
        let array = ['a', 'b', 'c'];
        forEach(array, (value, index, array) => {
            result[index] = value;
            expect(value).toBe(array[index]);
        });

        expect(result).toEqual(array);
    });

    it(`should be iteratee on object items`, () => {
        let result = {};
        let object = {a: 'A', b: 'B', c: 'C'};
        forEach(object, (value, key, array) => {
            result[key] = value;
            expect(value).toBe(object[key]);
        });

        expect(result).toEqual(object);
    });

    it(`should be iteratee on chars`, () => {
        let result = Array(5);
        let word = 'hello';
        forEach(word, (char, index, word) => {
            result[index] = char;
            expect(char).toBe(word[index]);
        });

        expect(result.join('')).toBe(word);
    });

    it(`should be get non object value and return the value`, () => {
        let result = forEach(1 as any, () => {});

        expect(result).toBe(1);
    });

    it('should iteratee with identity function and return the collection', () => {
        let object = {foo: 'bar'};
        let result = forEach(object);

        expect(result).toBe(object);
    });

});
