import utils from 'utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import { renderHook, waitFor } from '@testing-library/react';
import { useNormalizedTransactions } from './useNormalizedTransactions';

jest.mock('utils', () => ({
  loaders: {
    getTransactions: jest.fn()
  },
  converters: {
    prepareRowsData: jest.fn()
  }
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('useNormalizedTransactions', () => {
  const mockNavigate = jest.fn();
  const mockTranslation = {
    t: jest.fn((key) => key)
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  it('returns transactions and processes data correctly', async () => {
    const mockTransactions = {
      transactions: [
        { id: '1', payedByMe: true, registeredToMe: false },
        { id: '2', payedByMe: false, registeredToMe: true }
      ]
    };

    const preparedData = [{ id: '1' }, { id: '2' }];
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({
      data: mockTransactions,
      isError: false
    });
    (utils.converters.prepareRowsData as jest.Mock).mockReturnValue(preparedData);

    const { result } = renderHook(() => useNormalizedTransactions());

    await waitFor(() => {
      expect(result.current.all).toEqual(preparedData);
      expect(result.current.paidByMe).toEqual(preparedData);
      expect(result.current.registeredToMe).toEqual(preparedData);
      expect(result.current.error).toBe(false);

      expect(utils.loaders.getTransactions).toHaveBeenCalled();
      expect(utils.converters.prepareRowsData).toHaveBeenCalledWith({
        transactions: mockTransactions.transactions,
        status: { label: 'app.transactions.payed' },
        payee: { multi: 'app.transactions.multiEntities' },
        action: expect.any(Function)
      });

      const actionCallback = (utils.converters.prepareRowsData as jest.Mock).mock.calls[0][0]
        .action;
      actionCallback('1');
      expect(mockNavigate).toHaveBeenCalledWith(ArcRoutes.TRANSACTION.replace(':ID', '1'));
    });
  });

  it('handles error state correctly', async () => {
    (utils.loaders.getTransactions as jest.Mock).mockReturnValue({ data: null, isError: true });

    const { result } = renderHook(() => useNormalizedTransactions());

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.error).toBe(true);
    });
  });
});
