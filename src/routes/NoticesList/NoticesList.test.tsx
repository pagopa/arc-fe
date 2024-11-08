import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
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

describe('NoticesListRoute', () => {
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
      data: {
        notices: mockNoticesList.notices,
        continuationToken: ''
      },
      isError: false,
      refetch: () => ({ data: { continuationToken: '' } })
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
      isError: true,
      refetch: () => ({ data: null })
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

  it('gives a proper feedback when no data is returned', async () => {
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: [],
        continuationToken: ''
      },
      isError: false,
      refetch: () => ({ data: { notices: [], continuationToken: '' } })
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
    });
    expect(screen.getByTestId('paid.notices.empty.title')).toBeInTheDocument();
  });

  it('filters works properly', async () => {
    const mockNoticesList = {
      notices: [{ id: '1' }, { id: '2' }]
    };
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNoticesList.notices,
        continuationToken: ''
      },
      isError: false,
      refetch: () => ({ data: { notices: mockNoticesList.notices, continuationToken: '' } })
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        {
          size: 10,
          paidByMe: undefined,
          registeredToMe: undefined,
          ordering: 'DESC'
        },
        ''
      );
    });

    fireEvent.click(screen.getByText('app.transactions.paidByMe'));

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: true, size: 10, ordering: 'DESC' },
        ''
      );
    });
  });

  it('date order toggles correctly', async () => {
    const mockNoticesList = {
      notices: [{ id: '1' }, { id: '2' }]
    };
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNoticesList.notices,
        continuationToken: ''
      },
      isError: false,
      refetch: () => ({ data: { notices: mockNoticesList.notices, continuationToken: '' } })
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );

    fireEvent.click(screen.queryAllByText('app.transactions.date')[0]);

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'ASC' },
        ''
      );
    });

    fireEvent.click(screen.queryAllByText('app.transactions.date')[0]);

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
        ''
      );
    });
  });

  it('it renders pagination when nedeed', async () => {
    const mockNoticesList = {
      notices: [{ id: '1' }, { id: '2' }]
    };
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNoticesList.notices,
        continuationToken: '0001'
      },
      isError: false,
      refetch: () => ({ data: { notices: mockNoticesList.notices, continuationToken: '0001' } })
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NoticesList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const prev = screen.getByTestId('notices-pagination-prev');
      const next = screen.getByTestId('notices-pagination-next');
      // prev button
      expect(prev).toBeInTheDocument();
      expect(prev).toBeDisabled();

      // next button
      expect(next).toBeInTheDocument();
      expect(next).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('notices-pagination-next'));

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
        '0001'
      );
    });

    await waitFor(() => {
      const prev = screen.getByTestId('notices-pagination-prev');
      const next = screen.getByTestId('notices-pagination-next');
      // prev button
      expect(prev).toBeInTheDocument();
      expect(prev).not.toBeDisabled();

      // next button
      expect(next).toBeInTheDocument();
      expect(next).toBeDisabled();
    });
  });
});
