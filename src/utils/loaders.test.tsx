import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import loaders from 'utils/loaders'; // avoids mocked loaders
import utils from 'utils';
import 'whatwg-fetch';
import { TokenResponse } from '../../generated/data-contracts';

// Mock the utils module
jest.mock('utils', () => {
  const originalModule = jest.requireActual('utils');
  return {
    ...originalModule,
    apiClient: {
      transactions: {
        getTransactionsList: jest.fn(),
        getTransactionDetails: jest.fn(),
        getTransactionReceipt: jest.fn()
      },
      auth: {
        getUserInfo: jest.fn()
      },
      token: {
        getAuthenticationToken: jest.fn()
      }
    },
    zodSchema: {
      userInfoSchema: {
        safeParse: jest.fn().mockReturnValue({ success: true })
      },
      transactionDetailsDTOSchema: {
        safeParse: jest.fn().mockReturnValue({ success: true })
      },
      transactionsListDTOSchema: {
        safeParse: jest.fn().mockReturnValue({ success: true })
      },
      tokenResponseSchema: {
        safeParse: jest.fn().mockReturnValue({ success: true })
      }
    }
  };
});

describe('transactionsApi', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTransactions calls API and schema parser correctly', async () => {
    const mockTransactions = [{ id: 1, amount: 100 }];
    const mockTransactionList = utils.apiClient.transactions.getTransactionsList as jest.Mock;

    mockTransactionList.mockResolvedValue({ data: mockTransactions });

    const { result } = renderHook(() => loaders.getTransactions(), { wrapper });

    await waitFor(() => {
      expect(mockTransactionList).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockTransactions);
    });
  });

  it('getTransactionDetails calls API and schema parser correctly', async () => {
    const mockTransaction = { id: 1, amount: 100 };
    const transactionId = '1';
    const mockTransactionDetails = utils.apiClient.transactions.getTransactionDetails as jest.Mock;

    mockTransactionDetails.mockResolvedValue({ data: mockTransaction });

    const { result } = renderHook(() => loaders.getTransactionDetails(transactionId), {
      wrapper
    });

    await waitFor(() => {
      expect(mockTransactionDetails).toHaveBeenCalledWith(transactionId);
      expect(result.current.data).toEqual(mockTransaction);
    });
  });
});

describe('transactionReceipt', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getReceiptApi is called', async () => {
    const transactionId = '1';
    const mockTransactionReceipt = utils.apiClient.transactions.getTransactionReceipt as jest.Mock;

    mockTransactionReceipt.mockResolvedValue({ data: null });
    renderHook(() => loaders.getReceiptData(transactionId), { wrapper });

    await waitFor(() => {
      expect(mockTransactionReceipt).toHaveBeenCalledWith(transactionId, { format: 'blob' });
    });
  });
});

describe('userInfo', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUserInfo api is called', async () => {
    const mockUserInfo = utils.apiClient.auth.getUserInfo as jest.Mock;

    mockUserInfo.mockResolvedValue({ data: null });
    renderHook(() => loaders.getUserInfo(), { wrapper });

    await waitFor(() => {
      expect(mockUserInfo).toHaveBeenCalled();
    });
  });
});

describe('getUserInfoOnce', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeAll(() => {
    process.env.PAYMENT_RETURN_URL_schema = 'https://example.com';
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user info when sessionStorage is empty', async () => {
    const mockUserInfo = { name: 'John Doe', email: 'john.doe@example.com' };

    // Mock sessionStorage to return null (no user info stored)
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    // Mock the API call to return user info
    (utils.apiClient.auth.getUserInfo as jest.Mock).mockResolvedValue({
      data: mockUserInfo
    });

    const { result } = renderHook(() => loaders.getUserInfoOnce(), {
      wrapper
    });

    // Wait for the query to be successful
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    // Assert that the API was called
    expect(utils.apiClient.auth.getUserInfo).toHaveBeenCalled();

    // Assert that the safeParse function was called with the schema and user info
    expect(utils.zodSchema.userInfoSchema.safeParse).toHaveBeenCalledWith(mockUserInfo);

    // Assert the returned user info matches what the API returned
    expect(result.current.data).toEqual(mockUserInfo);
  });
});

describe('getTokenOneidentity function', () => {
  it('returns Token correctly', async () => {
    const mockResponse = {
      accessToken: 'tok1234',
      tokenType: 'Bearer',
      expiresIn: 7200
    } as TokenResponse;
    const mockGetAuthenticationToken = utils.apiClient.token.getAuthenticationToken as jest.Mock;
    mockGetAuthenticationToken.mockResolvedValue({ data: mockResponse });

    const request = new Request('https://website.it/auth-callback?code=code123&state=state123');
    const token = await loaders.getTokenOneidentity(request);

    expect(mockGetAuthenticationToken).toHaveBeenCalledWith(
      {
        code: 'code123',
        state: 'state123'
      },
      { withCredentials: true }
    );
    expect(mockGetAuthenticationToken).toHaveBeenCalledTimes(1);
    expect(token).toEqual(mockResponse);
  });
});
