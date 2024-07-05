import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import transactionsApi from 'utils/loaders'; // avoids mocked loaders
import utils from 'utils';

// Mock the utils module
jest.mock('utils', () => {
  const originalModule = jest.requireActual('utils');
  return {
    ...originalModule,
    apiClient: {
      transactions: {
        getTransactionsList: jest.fn(),
        getTransactionDetails: jest.fn()
      }
    },
    zodSchema: {
      transactionDetailsDTOSchema: {
        parse: jest.fn()
      },
      transactionsListDTOSchema: {
        parse: jest.fn()
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
    const mockZodTransactionResponse = utils.zodSchema.transactionsListDTOSchema.parse as jest.Mock;

    mockTransactionList.mockResolvedValue({ data: mockTransactions });

    const { result } = renderHook(() => transactionsApi.getTransactions(), { wrapper });

    await waitFor(() => {
      expect(mockTransactionList).toHaveBeenCalled();
      expect(mockZodTransactionResponse).toHaveBeenCalledWith(mockTransactions);
      expect(result.current.data).toEqual(mockTransactions);
    });
  });

  it('getTransactionDetails calls API and schema parser correctly', async () => {
    const mockTransaction = { id: 1, amount: 100 };
    const transactionId = '1';
    const mockTransactionDetails = utils.apiClient.transactions.getTransactionDetails as jest.Mock;
    const mockZodTransactionDetailResponse = utils.zodSchema.transactionDetailsDTOSchema
      .parse as jest.Mock;

    mockTransactionDetails.mockResolvedValue({ data: mockTransaction });

    const { result } = renderHook(() => transactionsApi.getTransactionDetails(transactionId), {
      wrapper
    });

    await waitFor(() => {
      expect(mockTransactionDetails).toHaveBeenCalledWith(transactionId);
      expect(mockZodTransactionDetailResponse).toHaveBeenCalledWith(mockTransaction);
      expect(result.current.data).toEqual(mockTransaction);
    });
  });
});
