import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(3443);
    expect(result).toBe(result);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'OPSSS! ERROR!';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    expect(throwError).toThrow(defaultMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
