import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useNormalizedTransactions } from './useNormalizedTransactions';
import { Mock } from 'vitest';
import converters from 'utils/converters';
import loaders from 'utils/loaders';
import i18n from 'translations/i18n';
import { TransactionsListDTO } from '../../generated/apiClient';
import { UseQueryResult } from '@tanstack/react-query';

vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

void i18n.init({
  resources: {}
});

describe('useNormalizedTransactions', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('returns transactions and processes data correctly', async () => {
    const mockTransactions = {
      transactions: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    const preparedData = [{ id: '1' }, { id: '2' }];
    vi.mocked(loaders.getTransactions).mockReturnValue({
      data: mockTransactions,
      isError: false
    } as unknown as UseQueryResult<TransactionsListDTO, Error>);

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    converters.prepareRowsData = mockPrepareRowsData;

    const { result } = renderHook(() => useNormalizedTransactions());

    await waitFor(() => {
      expect(result.current.all).toEqual(preparedData);
      expect(result.current.paidByMe).toEqual(preparedData);
      expect(result.current.registeredToMe).toEqual(preparedData);
      expect(result.current.queryResult.isError).toBe(false);

      // Verify correct filters are applied
      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        transactions: mockTransactions.transactions,
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });

      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        transactions: [mockTransactions.transactions[0]], // paidByMe
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });

      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        transactions: [mockTransactions.transactions[1]], // registeredToMe
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });
    });
  });

  it('handles error state correctly', async () => {
    vi.mocked(loaders.getTransactions).mockReturnValue({
      data: null as unknown as TransactionsListDTO,
      isError: true
    } as unknown as UseQueryResult<TransactionsListDTO, Error>);

    const { result } = renderHook(() => useNormalizedTransactions());

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(true);
    });
  });
});
