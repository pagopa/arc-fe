import loaders from './loaders';
import utils from 'utils';

jest.mock('utils');

const mockedGetTransactionList = jest.mocked(utils.apiClient.transactions.getTransactionList);
const mockedGetTransactionDetails = jest.mocked(utils.apiClient.transactions.getTransactionDetails);

const { dashboard, transactionDetails, transactionList } = loaders;

describe('dashboard function', () => {
  it('calls getTransactionList and returns data', async () => {
    const mockData = ['transaction1', 'transaction2'];

    // @ts-expect-error mocked axios response
    mockedGetTransactionList.mockResolvedValue({ data: mockData });

    const result = await dashboard();
    expect(result).toEqual(mockData);
  });

  it('handles error and returns empty array', async () => {
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const errorTest = new Error('Test Error');

    mockedGetTransactionList.mockRejectedValue(errorTest);

    const result = await dashboard();
    expect(result).toEqual(errorTest);

    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});

describe('transactionDetails function', () => {
  it('calls getTransactionDetails and returns data', async () => {
    const mockData = { id: '1', amount: 100 };

    // @ts-expect-error mocked axios response
    mockedGetTransactionDetails.mockResolvedValue(mockData);

    const result = await transactionDetails('1');
    expect(result).toEqual(mockData);
  });

  it('handles error and returns empty array', async () => {
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockedGetTransactionDetails.mockRejectedValue(new Error('Test Error'));

    const result = await transactionDetails(undefined);
    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});

describe('transactionList function', () => {
  it('calls getTransactionList and returns data', async () => {
    const mockData = { data: ['transaction1', 'transaction2'] };

    // @ts-expect-error mocked axios response
    mockedGetTransactionList.mockResolvedValue(mockData);

    const result = await transactionList();
    expect(result).toEqual(mockData);
  });

  it('handles error and returns empty array', async () => {
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockedGetTransactionList.mockRejectedValue(new Error('Test Error'));

    const result = await transactionList();
    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
