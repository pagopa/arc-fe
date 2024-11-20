import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import NoticesList from '.';
import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Mock } from 'vitest';
import loaders from 'utils/loaders';

const queryClient = new QueryClient();

const mockNotices = [
  {
    eventId: 'tst2.888387046189095300-8173-9980-7144-362-0',
    payeeName: 'ACI Automobile Club Italia',
    payeeTaxCode: '00493410583',
    amount: 53322,
    noticeDate: '2024-11-05T10:57:06Z',
    isCart: true,
    paidByMe: true,
    registeredToMe: true
  },
  {
    eventId: 'tst2.814804283493089500-9470-9311-9402-678-0',
    payeeName: 'ACI Automobile Club Italia',
    payeeTaxCode: '00493410583',
    amount: 53861,
    noticeDate: '2024-11-05T10:43:56Z',
    isCart: true,
    paidByMe: true,
    registeredToMe: true
  },
  {
    eventId: 'tst2.938002289163866200-6666-6117-6677-612-0',
    payeeName: 'ACI Automobile Club Italia',
    payeeTaxCode: '00493410583',
    amount: 73849,
    noticeDate: '2024-11-05T10:43:54Z',
    isCart: true,
    paidByMe: true,
    registeredToMe: true
  }
];

vi.mock('utils/loaders');

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
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNotices,
        continuationToken: ''
      },
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

  it('gives a proper feedback when no data is returned', async () => {
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: [],
        continuationToken: ''
      },
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
    expect(screen.getByTestId('paid.notices.empty.title')).toBeInTheDocument();
  });

  it('filters works properly', async () => {
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNotices,
        continuationToken: ''
      },
      isError: false
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
        '',
        [0, 0, 'DESC']
      );
    });

    fireEvent.click(screen.getByText('app.transactions.paidByMe'));
    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: true, size: 10, ordering: 'DESC' },
        '',
        [1, 0, 'DESC']
      );
    });

    fireEvent.click(screen.getByText('app.transactions.ownedByMe'));
    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: true, paidByMe: undefined, size: 10, ordering: 'DESC' },
        '',
        [2, 0, 'DESC']
      );
    });

    fireEvent.click(screen.getByText('app.transactions.all'));
    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
        '',
        [0, 0, 'DESC']
      );
    });
  });

  it('date order toggles correctly', async () => {
    (loaders.getNoticesList as Mock).mockReturnValue({
      data: {
        notices: mockNotices,
        continuationToken: ''
      },
      isError: false
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
        '',
        [0, 0, 'ASC']
      );
    });

    fireEvent.click(screen.queryAllByText('app.transactions.date')[0]);

    await waitFor(() => {
      expect(loaders.getNoticesList).toHaveBeenCalled();
      expect(loaders.getNoticesList).toBeCalledWith(
        { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
        '',
        [0, 0, 'DESC']
      );
    });
  });

  // it('it renders pagination when nedeed', async () => {
  //   (loaders.getNoticesList as Mock)
  //     .mockReturnValueOnce({
  //       data: {
  //         notices: mockNotices,
  //         continuationToken: '0001'
  //       },
  //       isError: false
  //     })
  //     .mockReturnValueOnce({
  //       data: {
  //         notices: mockNotices,
  //         continuationToken: ''
  //       },
  //       isError: false
  //     });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <NoticesList />
  //     </QueryClientProvider>
  //   );

  //   await waitFor(() => {
  //     expect(loaders.getNoticesList).toHaveBeenCalled();
  //     expect(loaders.getNoticesList).toBeCalledWith(
  //       { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
  //       '',
  //       [0, 0, 'DESC']
  //     );
  //   });

  //   await waitFor(() => {
  //     const prev = screen.getByTestId('notices-pagination-prev');
  //     const next = screen.getByTestId('notices-pagination-next');
  //     // prev button
  //     expect(prev).toBeInTheDocument();
  //     expect(prev).toBeDisabled();

  //     // next button
  //     expect(next).toBeInTheDocument();
  //     expect(next).not.toBeDisabled();
  //   });

  //   fireEvent.click(screen.getByTestId('notices-pagination-next'));

  //   await waitFor(() => {
  //     expect(loaders.getNoticesList).toHaveBeenCalled();
  //     expect(loaders.getNoticesList).toBeCalledWith(
  //       { registeredToMe: undefined, paidByMe: undefined, size: 10, ordering: 'DESC' },
  //       '0001',
  //       [0, 0, 'DESC']
  //     );
  //   });

  //   await waitFor(() => {
  //     const prev = screen.getByTestId('notices-pagination-prev');
  //     const next = screen.getByTestId('notices-pagination-next');
  //     // prev button
  //     expect(prev).toBeInTheDocument();
  //     expect(prev).not.toBeDisabled();

  //     // next button
  //     expect(next).toBeInTheDocument();
  //     expect(next).toBeDisabled();
  //   });
  // });
});
