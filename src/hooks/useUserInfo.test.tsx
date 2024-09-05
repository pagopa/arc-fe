// useUserInfo.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useUserInfo } from './useUserInfo'; // Path to your hook
import * as globalStore from 'store/GlobalStore'; // Mock this
import utils from 'utils'; // Mock this
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { State, STATE } from 'store/types';
import { userInfoSchema } from '../../generated/zod-schema';
import { UserInfo } from '../../generated/apiClient';
import { createMock } from 'zodock';

// Mock store
jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));

jest.mock('utils', () => ({
  loaders: {
    getUserInfoOnce: jest.fn()
  },
  apiClient: {
    auth: {
      getUserInfo: jest.fn()
    }
  }
}));

const mockSetState = jest.fn();
const queryClient = new QueryClient();

describe('useUserInfo hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should fetch and set user info on successful data load', async () => {
    const dataMock = createMock(userInfoSchema);

    jest
      .spyOn(utils.loaders, 'getUserInfoOnce')
      .mockReturnValue({ data: dataMock } as UseQueryResult<UserInfo, Error>);

    const storeMock = jest.spyOn(globalStore, 'useStore').mockReturnValueOnce({
      state: { userInfo: undefined } as State,
      setState: mockSetState
    });

    const { result } = renderHook(() => useUserInfo(), {
      wrapper
    });

    const userNoEmail = dataMock;
    delete userNoEmail.email; // Email should not be settes in the storage or state

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith(STATE.USER_INFO, userNoEmail);
      expect(result.current.userInfo).toBeUndefined(); // Depends on initial state
    });

    // Update the sotre state
    storeMock.mockReturnValue({
      state: { userInfo: userNoEmail } as State,
      setState: mockSetState
    });

    // Re-render the hook with the updated state
    const { result: updatedResult } = renderHook(() => useUserInfo(), {
      wrapper
    });

    await waitFor(() => {
      expect(updatedResult.current.userInfo).toEqual(dataMock);
    });
  });
});
