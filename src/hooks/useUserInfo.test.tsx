// useUserInfo.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useUserInfo } from './useUserInfo'; // Path to your hook
import { useStore } from 'store/GlobalStore'; // Mock this
import utils from 'utils'; // Mock this
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { STATE } from 'store/types';

// Mock store
jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));

// Mock utils
jest.mock('utils', () => ({
  loaders: {
    getUserInfoOnce: jest.fn()
  },
  apiClient: {
    auth: {
      getUserInfo: jest.fn()
    }
  },
  zodSchema: {
    userInfoSchema: jest.fn() // If parseAndLog calls this schema
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
    const userInfo = { name: 'John Doe', email: 'john.doe@example.com' }; // Mock user info

    // Mock the utils.loader.getUserInfoOnce to return a resolved value
    (utils.loaders.getUserInfoOnce as jest.Mock).mockReturnValue({
      data: userInfo
    });

    (useStore as jest.Mock).mockReturnValueOnce({
      state: undefined,
      setState: mockSetState
    });

    const { result } = renderHook(() => useUserInfo(), {
      wrapper
    });

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith(STATE.USER_INFO, { name: 'John Doe' }); // Email should be deleted
      expect(result.current.userInfo).toBeUndefined(); // Depends on initial state
    });

    // Update the state in your mock and recheck
    (useStore as jest.Mock).mockReturnValue({
      state: { userInfo: { name: 'John Doe' } },
      setState: mockSetState
    });

    // Re-render the hook with the updated state
    const { result: updatedResult } = renderHook(() => useUserInfo(), {
      wrapper
    });

    await waitFor(() => {
      expect(updatedResult.current.userInfo).toEqual({ name: 'John Doe' });
    });
  });
});
