import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1500;
  let bank1: BankAccount;
  let bank2: BankAccount;

  beforeEach(() => {
    bank1 = getBankAccount(initialBalance);
    bank2 = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bank1.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bank1.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bank1.transfer(2000, bank2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bank1.transfer(500, bank1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bank1.deposit(500);
    expect(bank1.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    bank1.withdraw(500);
    expect(bank1.getBalance()).toBe(1000);
  });

  test('should transfer money', () => {
    bank1.transfer(500, bank2);
    expect(bank1.getBalance()).toBe(1000);
    expect(bank2.getBalance()).toBe(2000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bank1, 'fetchBalance').mockResolvedValueOnce(75);

    expect(await bank1.fetchBalance()).toBe(75);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bank1, 'fetchBalance').mockResolvedValueOnce(75);

    await bank1.synchronizeBalance();
    expect(bank1.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bank1, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bank1.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
