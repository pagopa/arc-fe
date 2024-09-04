import React from 'react';
import { render, waitFor } from '@testing-library/react';
import User from '.';
import '@testing-library/jest-dom';
import { useStore } from 'store/GlobalStore';
import utils from 'utils';
import { useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
jest.mock('utils', () => ({
  ...jest.requireActual('utils'),

  loaders: {
    getUserInfo: jest.fn()
  }
}));
jest.mock('@mui/material/useMediaQuery', () => jest.fn());

jest.mock('store/GlobalStore', () => ({
  useStore: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('UserRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);
  const setState = jest.fn();

  //const preparedData = [{ id: '1' }, { id: '2' }];
  (utils.loaders.getUserInfo as jest.Mock).mockReturnValue({
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
    (useStore as jest.Mock).mockReturnValue({ setState });
  });

  afterEach(() => {
    jest.clearAllMocks();
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
