import React from 'react';
import { render, waitFor } from '@testing-library/react';
import NoticesList from '.';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Mock } from 'vitest';
import loaders from 'utils/loaders';

const queryClient = new QueryClient();

vi.mock('utils/loaders');
vi.mock('utils/converters');

vi.mock(import('utils/config'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    checkoutHost: 'test'
  };
});

vi.mock(import('@mui/material'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMediaQuery: vi.fn()
  };
});

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('TransactionListRoute', () => {
  beforeEach(() => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const mockNoticesList = {
      notices: [
        { id: '1', paidByMe: true, registeredToMe: false },
        { id: '2', paidByMe: false, registeredToMe: true }
      ]
    };

    (loaders.getNoticesList as Mock).mockReturnValue({
      data: mockNoticesList,
      isError: false
    });
    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
    });
  });
  it('renders with error', async () => {
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: null,
      isError: true
    });
    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
    });
  });
});
