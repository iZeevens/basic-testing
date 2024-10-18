import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';

const time = 2000;
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, time);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, time);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(time);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    doStuffByInterval(callback, time);
    expect(spy).toBeCalledWith(expect.any(Function), time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();

    doStuffByInterval(callback, time);
    expect(spy).toBeCalledWith(expect.any(Function), time);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const spyJoin = jest.spyOn(path, 'join');
    jest
      .spyOn(fsPromise, 'readFile')
      .mockResolvedValue(Buffer.from('file content'));

    const pathToFile = 'index.ts';

    await readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const pathToFile = 'index.ts';
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromise, 'readFile')
      .mockResolvedValue(Buffer.from('file content'));

    const pathToFile = 'index.ts';
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe('file content');
  });
});
