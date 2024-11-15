import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useNormalizedNoticesList } from './useNormalizedNoticesList';
import { Mock } from 'vitest';
import converters from 'utils/converters';
import loaders from 'utils/loaders';
import { NoticeDTO } from '../../generated/apiClient';
import { UseQueryResult } from '@tanstack/react-query';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('useNormalizedNoticesList', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('returns all notices and processes data correctly', async () => {
    const mockNoticesList = [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true },
      { id: '3', paidByMe: true, registeredToMe: true }
    ];

    const preparedData = [{ id: '1' }, { id: '2' }, { id: '3' }];

    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: { notices: mockNoticesList, continuationToken: '' },
      isError: false
    } as unknown as UseQueryResult<{ notices: NoticeDTO[]; continuationToken: string }, Error>);

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    converters.prepareRowsData = mockPrepareRowsData;

    const { result } = renderHook(() =>
      useNormalizedNoticesList({ continuationToken: '', ordering: 'DESC' })
    );

    await waitFor(() => {
      expect(result.current.all).toEqual(preparedData);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(false);

      expect(mockPrepareRowsData).toBeCalledTimes(1);
      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: mockNoticesList,
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });
    });
  });

  it('returns payedByMe notices and processes data correctly', async () => {
    const mockNoticesList = [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true },
      { id: '3', paidByMe: true, registeredToMe: true }
    ];

    const preparedData = [{ id: '1' }, { id: '3' }];

    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: { notices: mockNoticesList, continuationToken: '' },
      isError: false
    } as unknown as UseQueryResult<{ notices: NoticeDTO[]; continuationToken: string }, Error>);

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    converters.prepareRowsData = mockPrepareRowsData;

    const { result } = renderHook(() =>
      useNormalizedNoticesList({ paidByMe: true, continuationToken: '', ordering: 'DESC' })
    );

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual(preparedData);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(false);

      expect(mockPrepareRowsData).toBeCalledTimes(1);
      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: mockNoticesList,
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });
    });
  });

  it('returns registeredToMe notices and processes data correctly', async () => {
    const mockNoticesList = [
      { id: '1', paidByMe: true, registeredToMe: false },
      { id: '2', paidByMe: false, registeredToMe: true },
      { id: '3', paidByMe: true, registeredToMe: true }
    ];

    const preparedData = [{ id: '2' }, { id: '3' }];
    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: { notices: mockNoticesList, continuationToken: '' },
      isError: false
    } as unknown as UseQueryResult<{ notices: NoticeDTO[]; continuationToken: string }, Error>);

    const mockPrepareRowsData = vi.fn().mockReturnValue(preparedData);
    converters.prepareRowsData = mockPrepareRowsData;

    const { result } = renderHook(() =>
      useNormalizedNoticesList({ registeredToMe: true, continuationToken: '', ordering: 'DESC' })
    );

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual(preparedData);
      expect(result.current.queryResult.isError).toBe(false);

      expect(mockPrepareRowsData).toBeCalledTimes(1);
      expect(mockPrepareRowsData).toHaveBeenCalledWith({
        notices: mockNoticesList,
        status: { label: 'app.transactions.paid' },
        payee: { multi: 'app.transactions.multiEntities' }
      });
    });
  });

  it('handles error state correctly', async () => {
    vi.mocked(loaders.getNoticesList).mockReturnValue({
      data: null,
      isError: true
    } as unknown as UseQueryResult<{ notices: NoticeDTO[]; continuationToken: string }, Error>);

    const { result } = renderHook(() =>
      useNormalizedNoticesList({ continuationToken: '', ordering: 'DESC' })
    );

    await waitFor(() => {
      expect(result.current.all).toEqual([]);
      expect(result.current.paidByMe).toEqual([]);
      expect(result.current.registeredToMe).toEqual([]);
      expect(result.current.queryResult.isError).toBe(true);
    });
  });
});
