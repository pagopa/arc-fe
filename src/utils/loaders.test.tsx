import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';
import 'whatwg-fetch';
import loaders from 'utils/loaders';
import utils from 'utils';
import { StoreProvider } from 'store/GlobalStore';
import { createMock } from 'zodock';
import * as schemas from '../../generated/zod-schema';
import { AxiosResponse } from 'axios';

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
    }
  };
});

jest.mock('@preact/signals-react', () => ({
  signal: jest.fn(),
  effect: jest.fn()
}));

describe('api loaders', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StoreProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('transactionsApi', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('getTransactions calls API and schema parser correctly', async () => {
      const dataMock = createMock(schemas.transactionsListDTOSchema);

      const apiMock = jest
        .spyOn(utils.apiClient.transactions, 'getTransactionsList')
        .mockResolvedValue({ data: dataMock } as AxiosResponse);

      const { result } = renderHook(() => loaders.getTransactions(), { wrapper });

      await waitFor(() => {
        expect(apiMock).toHaveBeenCalled();
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toEqual(dataMock);
      });
    });

    it('getTransactionDetails calls API and schema parser correctly', async () => {
      const dataMock = createMock(schemas.transactionDetailsDTOSchema);

      const transactionId = dataMock.infoTransaction?.transactionId;

      const apiMock = jest
        .spyOn(utils.apiClient.transactions, 'getTransactionDetails')
        .mockResolvedValue({ data: dataMock } as AxiosResponse);

      const { result } = renderHook(() => loaders.getTransactionDetails(transactionId as string), {
        wrapper
      });

      await waitFor(() => {
        expect(apiMock).toHaveBeenCalledWith(transactionId);
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toEqual(dataMock);
      });
    });
  });

  describe('transactionReceipt', () => {
    it('getReceiptApi is called', async () => {
      const transactionId = '1';

      const apiMock = jest
        .spyOn(utils.apiClient.transactions, 'getTransactionReceipt')
        .mockResolvedValue({ data: null } as AxiosResponse);

      renderHook(() => loaders.getReceiptData(transactionId), { wrapper });

      await waitFor(() => {
        expect(apiMock).toHaveBeenCalledWith(transactionId, { format: 'blob' });
      });
    });
  });

  describe('userInfo', () => {
    const dataMock = createMock(schemas.userInfoSchema);

    const apiMock = jest
      .spyOn(utils.apiClient.auth, 'getUserInfo')
      .mockResolvedValue({ data: dataMock } as AxiosResponse);

    it('getUserInfo api is called', async () => {
      const { result } = renderHook(() => loaders.getUserInfo(), { wrapper });

      await waitFor(() => {
        expect(apiMock).toHaveBeenCalled();
        expect(result.current.data).toEqual(dataMock);
      });
    });

    describe('getUserInfoOnce', () => {
      it('fetch if sessionStorage.userInfo is missing', async () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

        const { result } = renderHook(() => loaders.getUserInfoOnce(), {
          wrapper
        });

        await waitFor(() => {
          expect(utils.apiClient.auth.getUserInfo).toHaveBeenCalled();
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toEqual(dataMock);
        });
      });

      it('does not fetch if sessionStorage.userInfo is set', async () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');

        const { result } = renderHook(() => loaders.getUserInfoOnce(), {
          wrapper
        });

        expect(utils.apiClient.auth.getUserInfo).not.toHaveBeenCalled();
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.fetchStatus).toBe('idle');
      });
    });
  });

  describe('getTokenOneidentity function', () => {
    it('returns Token correctly', async () => {
      const dataMock = createMock(schemas.tokenResponseSchema);

      const apiMock = jest
        .spyOn(utils.apiClient.token, 'getAuthenticationToken')
        .mockResolvedValue({ data: dataMock } as AxiosResponse);

      const request = new Request('https://website.it/auth-callback?code=code123&state=state123');
      const token = await loaders.getTokenOneidentity(request);

      expect(apiMock).toHaveBeenCalledWith(
        {
          code: 'code123',
          state: 'state123'
        },
        { withCredentials: true }
      );
      expect(token).toEqual(dataMock);
    });
  });
});
