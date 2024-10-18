import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts';
  const baseURL = 'https://jsonplaceholder.typicode.com';
  let mockGet: jest.Mock;
  let mockCreate: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue({ data: {} });
    mockCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock).mockImplementation(mockCreate);
  });

  test('should create instance with provided base url', async () => {
    const throttledPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(5000);
    await throttledPromise;

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const throttledPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(5000);
    await throttledPromise;

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Post title' };
    mockGet.mockResolvedValue({ data: mockData });

    const throttledPromise = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(5000);
    const result = await throttledPromise;

    expect(result).toBe(mockData);
  });
});
