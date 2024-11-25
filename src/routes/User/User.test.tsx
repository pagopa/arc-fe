import React from 'react';
import { render, waitFor } from '@testing-library/react';
import User from '.';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';
import { Mock } from 'vitest';
import loaders from 'utils/loaders';
import { UserInfo } from '../../../generated/apiClient';

const queryClient = new QueryClient();
vi.mock('utils/loaders');

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('UserRoute', () => {
  const setState = vi.fn();

  vi.mocked(loaders.getUserInfo).mockReturnValue({
    data: {
      userId: 'string',
      fiscalCode: 'string',
      familyName: 'string',
      name: 'string',
      email: 'string'
    },
    isError: false
  } as UseQueryResult<UserInfo, Error>);

  beforeEach(() => {
    (useStore as Mock).mockReturnValue({ setState });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <User />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(utils.loaders.getUserInfo).toHaveBeenCalled();
    });
  });
});
