import React from 'react';
import { render, waitFor } from '@testing-library/react';
import User from '.';
import '@testing-library/vi-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
vi.mock('utils', () => ({
  ...vi.importActual('utils'),

  loaders: {
    getUserInfo: vi.fn()
  }
}));

vi.mock('store/GlobalStore', () => ({
  useStore: vi.fn()
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('UserRoute', () => {
  const setState = vi.fn();

  //const preparedData = [{ id: '1' }, { id: '2' }];
  (utils.loaders.getUserInfo as Mock).mockReturnValue({
    data: {
      userId: 'string',
      fiscalCode: 'string',
      familyName: 'string',
      name: 'string',
      email: 'string'
    },
    isError: false
  });

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
