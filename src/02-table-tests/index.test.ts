import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 65, b: 54, action: Action.Subtract, expected: 11 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 43, b: 32, action: Action.Divide, expected: 1.34375 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 3, action: 'dsds', expected: null },
  { a: 'ds', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
