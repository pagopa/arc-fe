import { renderHook, waitFor } from '@testing-library/react';
import { useUserInfo } from './useUserInfo';
import * as globalStore from 'store/GlobalStore';
import utils from 'utils';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { State, STATE } from 'store/types';
import { userInfoSchema } from '../../generated/zod-schema';
import { UserInfo } from '../../generated/apiClient';
import { createMock } from 'zodock';

jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));

jest.mock('utils', () => ({
  loaders: {
    getUserInfoOnce: jest.fn()
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
      .mockReturnValue({ data: dataMock, isSuccess: true } as UseQueryResult<UserInfo, Error>);

    const storeMock = jest.spyOn(globalStore, 'useStore').mockReturnValue({
      state: { userInfo: undefined } as State,
      setState: mockSetState
    });

    renderHook(() => useUserInfo(), { wrapper });

    const userNoEmail = { ...dataMock };
    delete userNoEmail.email;

    // Wait for the effect to trigger and update the state
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith(STATE.USER_INFO, userNoEmail);
    });

    // Mock store with updated userInfo state
    storeMock.mockReturnValue({
      state: { userInfo: userNoEmail } as State,
      setState: mockSetState
    });

    // simulate state change
    const { result: updatedResult } = renderHook(() => useUserInfo(), { wrapper });

    await waitFor(() => {
      expect(updatedResult.current.userInfo).toEqual(userNoEmail);
    });
  });
});