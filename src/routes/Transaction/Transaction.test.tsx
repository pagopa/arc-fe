import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Transaction from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import { Mock } from 'vitest';
import { TransactionsListDTO } from '../../../generated/apiClient';
import loaders from 'utils/loaders';

vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock(import('utils/config'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    checkoutHost: 'test'
  };
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLoaderData: vi.fn()
}));

describe('TransactionRoute', () => {
  const queryClient = new QueryClient();

  const mockTransactions = {
    transactions: [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true }
    ]
  };

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    vi.mocked(loaders.getTransactions).mockReturnValue({
      data: mockTransactions,
      isError: false
    } as unknown as UseQueryResult<TransactionsListDTO, Error>);

    (loaders.getTransactionDetails as Mock).mockReturnValue({
      data: mockTransactions.transactions[0],
      isError: false
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Transaction />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(loaders.getTransactionDetails).toHaveBeenCalled();
    });
  });

  it('renders without crashing error', async () => {
    (loaders.getTransactions as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    (loaders.getTransactionDetails as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Transaction />
      </QueryClientProvider>
    );
  });
});
