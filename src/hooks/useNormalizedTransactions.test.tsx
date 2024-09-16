import utils from 'utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useNormalizedTransactions } from './useNormalizedTransactions';
import { Mock } from 'vitest';

vi.mock('utils', () => ({
  loaders: {
    getTransactions: vi.fn()
  },
  converters: {
    prepareRowsData: vi.fn()
  }
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('useNormalizedTransactions', () => {
  const mockNavigate = vi.fn();
  const mockTranslation = {
    t: vi.fn((key) => key)
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useTranslation as Mock).mockReturnValue(mockTranslation);
  });

  it('returns transactions and processes data correctly', async () => {
    const mockTransactions = {
      transactions: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    const preparedData = [{ id: '1' }, { id: '2' }];
    (utils.loaders.getTransactions as Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    utils.converters.prepareRowsData = mockPrepareRowsData;

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
    (utils.loaders.getTransactions as Mock).mockReturnValue({ data: null, isError: true });

    const { result } = renderHook(() => useNormalizedTransactions());

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(true);
    });
  });
});
