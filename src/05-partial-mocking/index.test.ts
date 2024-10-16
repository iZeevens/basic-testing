import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: originalModule.unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    unmockedFunction();

    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
