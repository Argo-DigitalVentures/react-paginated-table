import evaluate from '../evaluate';

describe('evaluate()', () => {
  it('should return the string if passed a string', () => {
    const string = 'This is a test.';
    const result = evaluate(string);
    expect(result).toBe(string);
  });

  it('should return the string even if passed additional arguments', () => {
    const string = 'This is a test.';
    const result = evaluate(string, 1, 2, 3, 4);
    expect(result).toBe(string);
  });

  it('should return the result of invoking a first argument function with the additional arguments', () => {
    const spy = jest.fn().mockReturnValue({ test: true });
    const result = evaluate(spy, 1, 2, 3, 4);
    expect(spy).toBeCalledWith(1, 2, 3, 4);
    expect(result).toEqual({ test: true });
  });
});
