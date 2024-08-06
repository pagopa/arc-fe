import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import loaders from 'utils/loaders'; // avoids mocked loaders
import utils from 'utils';
import 'whatwg-fetch';

// Mock the utils module
jest.mock('utils', () => {
  const originalModule = jest.requireActual('utils');
  return {
    ...originalModule,
    apiClient: {
      transactions: {
        getTransactionsList: jest.fn(),
        getTransactionDetails: jest.fn(),
        getTransactionReceipt: jest.fn()
      },
      token: {
        getAuthenticationToken: jest.fn()
      }
    },
    zodSchema: {
      transactionDetailsDTOSchema: {
        safeParse: () => ({ success: true })
      },
      transactionsListDTOSchema: {
        safeParse: () => ({ success: true })
      }
    }
  };
});

describe('transactionsApi', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTransactions calls API and schema parser correctly', async () => {
    const mockTransactions = [{ id: 1, amount: 100 }];
    const mockTransactionList = utils.apiClient.transactions.getTransactionsList as jest.Mock;

    mockTransactionList.mockResolvedValue({ data: mockTransactions });

    const { result } = renderHook(() => loaders.getTransactions(), { wrapper });

    await waitFor(() => {
      expect(mockTransactionList).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockTransactions);
    });
  });

  it('getTransactionDetails calls API and schema parser correctly', async () => {
    const mockTransaction = { id: 1, amount: 100 };
    const transactionId = '1';
    const mockTransactionDetails = utils.apiClient.transactions.getTransactionDetails as jest.Mock;

    mockTransactionDetails.mockResolvedValue({ data: mockTransaction });

    const { result } = renderHook(() => loaders.getTransactionDetails(transactionId), {
      wrapper
    });

    await waitFor(() => {
      expect(mockTransactionDetails).toHaveBeenCalledWith(transactionId);
      expect(result.current.data).toEqual(mockTransaction);
    });
  });
});

describe('transactionReceipt', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getReceiptApi is called', async () => {
    const transactionId = '1';
    const mockTransactionReceipt = utils.apiClient.transactions.getTransactionReceipt as jest.Mock;

    mockTransactionReceipt.mockResolvedValue({ data: null });
    renderHook(() => loaders.getReceiptData(transactionId), { wrapper });

    await waitFor(() => {
      expect(mockTransactionReceipt).toHaveBeenCalledWith(transactionId, { format: 'blob' });
    });
  });
});

describe('getTokenOneidentity function', () => {
  it('returns Token correctly', async () => {
    const mockResponse = { access_token: 'tok1234', token_type: 'token', expires_in: 7200 };
    const mockGetAuthenticationToken = utils.apiClient.token.getAuthenticationToken as jest.Mock;
    mockGetAuthenticationToken.mockResolvedValue({ data: mockResponse });

    const request = new Request('https://website.it/auth-callback?code=code123&state=state123');
    const token = await loaders.getTokenOneidentity(request);

    expect(mockGetAuthenticationToken).toHaveBeenCalledWith(
      {
        code: 'code123',
        state: 'state123'
      },
      { withCredentials: true }
    );
    expect(mockGetAuthenticationToken).toHaveBeenCalledTimes(1);
    expect(token).toEqual(mockResponse);
  });
});
