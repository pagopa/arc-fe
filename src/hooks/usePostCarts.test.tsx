import { renderHook, act, waitFor } from '@testing-library/react';
import { usePostCarts } from './usePostCarts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import utils from 'utils';
import { mockCartItems } from 'stories/utils/PaymentNoticeMocks';
import React, { ReactNode } from 'react';

import { AxiosResponse } from 'axios';

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePostCarts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  it('should converters cartItem[] correctly and call onSuccess as callback', async () => {
    const mockData = 'Response with URL=https://redirect.com';

    vi.spyOn(utils.cartsClient, 'postCarts').mockResolvedValue({ data: mockData } as AxiosResponse);

    const { result } = renderHook(
      () => usePostCarts({ onSuccess: mockOnSuccess, onError: mockOnError }),
      {
        wrapper: createWrapper()
      }
    );

    await act(async () => {
      await result.current.mutateAsync({ notices: mockCartItems, email: 'test@test.it' });
    });

    await waitFor(() => !result.current.isIdle);

    expect(utils.cartsClient.postCarts).toHaveBeenCalledWith({
      emailNotice: 'test@test.it',
      paymentNotices: [
        {
          noticeNumber: mockCartItems[0].nav,
          fiscalCode: mockCartItems[0].paTaxCode,
          amount: mockCartItems[0].amount,
          companyName: mockCartItems[0].paFullName,
          description: mockCartItems[0].description
        }
      ],
      returnUrls: {
        returnCancelUrl: 'http://localhost:1234',
        returnErrorUrl: 'http://localhost:1234',
        returnOkUrl: 'http://localhost:1234'
      }
    });
    expect(mockOnSuccess).toHaveBeenCalledWith('https://redirect.com');
    expect(mockOnError).not.toHaveBeenCalled();
  });
});
