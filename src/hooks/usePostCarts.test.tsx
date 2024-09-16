import { renderHook, act, waitFor } from '@testing-library/react';
import { usePostCarts } from './usePostCarts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import utils from 'utils';
import { PaymentNoticeSingleType } from 'models/PaymentNotice';
import { mockNotice } from 'stories/utils/PaymentNoticeMocks';
import React, { ReactNode } from 'react';
import { useUserEmail } from './useUserEmail';
import { Mock } from 'vitest';

vi.mock('utils', () => ({
  cartsClient: {
    postCarts: vi.fn()
  },
  converters: {
    singleNoticeToCartsRequest: vi.fn()
  }
}));

vi.mock('./useUserEmail', () => ({
  useUserEmail: vi.fn()
}));

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePostCarts', () => {
  const mockOnSuccess = vi.fn();
  const mockSingleNotice: PaymentNoticeSingleType = mockNotice;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call utils.converters.singleNoticeToCartsRequest and utils.cartsClient.postCarts', async () => {
    const mockData = 'Response with URL=https://redirect.com';

    (utils.converters.singleNoticeToCartsRequest as Mock).mockReturnValue(mockSingleNotice);
    (utils.cartsClient.postCarts as Mock).mockResolvedValue({ data: mockData });
    (useUserEmail as Mock).mockResolvedValue('test@test.it');

    const { result } = renderHook(() => usePostCarts({ onSuccess: mockOnSuccess }), {
      wrapper: createWrapper()
    });

    await act(async () => {
      await result.current.mutateAsync({ singleNotice: mockSingleNotice });
    });
    await waitFor(() => !result.current.isIdle);

    expect(utils.converters.singleNoticeToCartsRequest).toHaveBeenCalledWith(mockSingleNotice);
    expect(utils.cartsClient.postCarts).toHaveBeenCalledWith(mockSingleNotice);
    expect(mockOnSuccess).toHaveBeenCalledWith('https://redirect.com');
  });
});
