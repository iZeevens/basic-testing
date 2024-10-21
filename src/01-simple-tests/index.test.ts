import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 54, b: 34, action: Action.Add })).toBe(88);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 65, b: 54, action: Action.Subtract })).toBe(
      11,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 43, b: 32, action: Action.Divide })).toBe(
      1.34375,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Exponentiate })).toBe(
      125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: 'dsds' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'ds', b: 3, action: Action.Add })).toBe(null);
  });
});
