import reduce from '../';

describe(`reduce()`, () => {
    it(`should be reduce on array without accumulator`, () => {
        let array = [0, 1, 2, 3, 4];
        let result = reduce(array, (result: number, value: number) => {
            return result + value;
        });

        expect(result).toBe(10);
    });

    it(`should be reduce on object with accumulator`, () => {
        let object = {a: 'A', b: 'B', c: 'C'};
        let result: string[] = reduce(object, (result, value, key, array) => {
            result.push(key);
            return result;
        }, []);

        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should reduce on array without accumulator', () => {
        let array: number[] = [1, 3, 5, 7, 9];
        let result: number = reduce(array, (sum: number, num: number) => sum + num);
        expect(result).toBe(25);
    });

    it('should reduce on string without iteratee and accumulator', () => {
        let word: string = 'foo';
        let result: string = reduce(word);
        expect(result).toBe('f');
    });
});
