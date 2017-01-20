import select from '../select';

const testObj = {
  prop1: {
    prop3: [1, 2, 3, 4],
    prop4: 'world',
  },
  prop2: {
    prop5: 'yay, javascript!',
  },
};

const defaultValue = 'default';

describe('select()', () => {
  it('should return the default value if pathOrFunction is neither a string nor a function', () => {
    expect(select(testObj, [], defaultValue)).toBe(defaultValue);
  });

  it('should return the result of invoking a function with the collection', () => {
    const selectorFn = obj => obj.prop1.prop3.map(x => x * 2);
    expect(select(testObj, selectorFn, defaultValue)).toEqual([2, 4, 6, 8]);
  });

  it('should return the default value if the function returns undefined', () => {
    const spy = jest.fn().mockReturnValue(undefined);
    const result = select(testObj, spy, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it('should return the value at the path of an object or array', () => {
    expect(select(testObj, 'prop1.prop3.1', defaultValue)).toBe(2);
    expect(select(testObj, 'prop2.prop5', defaultValue)).toBe('yay, javascript!');
  });

  it('should return the default value if the value at the path in the collection is undefined', () => {
    const result = select(testObj, 'prop7.prop5', defaultValue);
    expect(result).toBe(defaultValue);
  });
});
