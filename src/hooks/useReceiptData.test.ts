import { renderHook, waitFor } from '@testing-library/react';
import { useReceiptData } from './useReceiptData';
import { dummyTransactionsData } from 'stories/utils/mocks';
import utils from 'utils';

jest.mock('utils');
const mockedGetReceipt = jest.mocked(utils.apiClient.transactions.getTransactionReceipt);

const { transactionReceipt } = dummyTransactionsData;
const expectedReceipt = transactionReceipt.attachments[0];

describe('useReceiptData hook', () => {
  it('should be pending while resolving the response', async () => {
    // @ts-expect-error mocked axios response
    mockedGetReceipt.mockResolvedValue({ data: transactionReceipt });

    const { result } = renderHook(() => useReceiptData('test'));

    expect(result.current.isPending).toBeTruthy();

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy();
    });
  });

  it('should return error on missing attachments', async () => {
    // @ts-expect-error mocked axios response & missing attachments
    mockedGetReceipt.mockResolvedValue({
      data: { ...transactionReceipt, attachments: [] }
    });

    const { result } = renderHook(() => useReceiptData('test'));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it('should return error on missing url', async () => {
    mockedGetReceipt.mockResolvedValue({
      // @ts-expect-error mocked axios response & missing url
      data: { ...transactionReceipt, attachments: [{ ...expectedReceipt, url: undefined }] }
    });

    const { result } = renderHook(() => useReceiptData('test'));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it('should return receipt on expected response', async () => {
    // @ts-expect-error mocked axios response
    mockedGetReceipt.mockResolvedValue({ data: transactionReceipt });

    const { result } = renderHook(() => useReceiptData('test'));

    expect(result.current.isPending).toBeTruthy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.receipt).toBe('');

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy();
      expect(result.current.error).toBeFalsy();
      expect(result.current.receipt).toBe(expectedReceipt.url);
    });
  });
});
