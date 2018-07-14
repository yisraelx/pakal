import assertity from '../';

describe(`assertity()`, () => {
    it(`should assert and throw message`, () => {
        let isString = (value) => typeof value === 'string';
        let assertString = assertity(isString, 'The value is not string.');
        expect(() => {
            assertString(777);
        }).toThrowError('The value is not string');

        expect(assertString(':)')).toBeUndefined();
    });

    it(`should assert with params and throw fn message`, () => {
        let toBe = (that: any, other: any) => that === other;
        let assertToBe = assertity(toBe, (that: any, other: any) => {
            return `${that} !== ${other}`;
        });

        expect(() => {
            assertToBe(1, 2);
        }).toThrowError('1 !== 2');

        expect(assertToBe(null, null)).toBeUndefined();
    });

    it('should call on object scope', () => {
        let object = {
            num: 55,
            isNum(num) {
                return num === this.num;
            }
        };

        object.isNum = assertity(object.isNum, 'is not num') as any;
        expect(object.isNum(55)).toBeUndefined();
        expect(() => {
            object.isNum(33);
        }).toThrowError('is not num');
    });
});
