import { renderHook, act, waitFor } from '@testing-library/react';
import { usePostCarts } from './usePostCarts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import utils from 'utils';
import { PaymentNoticeSingleType } from 'models/PaymentNotice';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';
import React, { ReactNode } from 'react';

jest.mock('utils', () => ({
  cartsClient: {
    postCarts: jest.fn()
  },
  converters: {
    singleNoticeToCartsRequest: jest.fn()
  }
}));

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePostCarts', () => {
  const mockOnSuccess = jest.fn();
  const mockSingleNotice: PaymentNoticeSingleType = mockNotice;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call utils.converters.singleNoticeToCartsRequest and utils.cartsClient.postCarts', async () => {
    const mockData = 'Response with URL=https://redirect.com';

    (utils.converters.singleNoticeToCartsRequest as jest.Mock).mockReturnValue(mockSingleNotice);
    (utils.cartsClient.postCarts as jest.Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => usePostCarts({ onSuccess: mockOnSuccess }), {
      wrapper: createWrapper()
    });

    await act(async () => {
      await result.current.mutateAsync(mockSingleNotice);
    });
    await waitFor(() => !result.current.isIdle);

    expect(utils.converters.singleNoticeToCartsRequest).toHaveBeenCalledWith(mockSingleNotice);
    expect(utils.cartsClient.postCarts).toHaveBeenCalledWith(mockSingleNotice);
    expect(mockOnSuccess).toHaveBeenCalledWith('https://redirect.com');
  });
});
