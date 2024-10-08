import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useNormalizedNoticesList } from './useNormalizedNoticesList';
import { Mock } from 'vitest';
import converters from 'utils/converters';
import loaders from 'utils/loaders';
import { NoticesListDTO } from '../../generated/apiClient';
import { UseQueryResult } from '@tanstack/react-query';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('useNormalizedTransactions', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('returns transactions and processes data correctly', async () => {
    const mockNoticesList = {
      notices: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    const preparedData = [{ id: '1' }, { id: '2' }];
    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: mockNoticesList,
      isError: false
    } as unknown as UseQueryResult<NoticesListDTO, Error>);

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    converters.prepareRowsData = mockPrepareRowsData;

    const { result } = renderHook(() => useNormalizedNoticesList());

    await waitFor(() => {
      expect(result.current.all).toEqual(preparedData);
      expect(result.current.paidByMe).toEqual(preparedData);
      expect(result.current.registeredToMe).toEqual(preparedData);
      expect(result.current.queryResult.isError).toBe(false);

      // Verify correct filters are applied
      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: mockNoticesList.notices,
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });

      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: [mockNoticesList.notices[0]], // paidByMe
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });

      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: [mockNoticesList.notices[1]], // registeredToMe
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });
    });
  });

  it('handles error state correctly', async () => {
    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: null as unknown as NoticesListDTO,
      isError: true
    } as unknown as UseQueryResult<NoticesListDTO, Error>);

    const { result } = renderHook(() => useNormalizedNoticesList());

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(true);
    });
  });
});
