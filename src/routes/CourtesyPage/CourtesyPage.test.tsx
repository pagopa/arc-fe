import React from 'react';
import { render } from '@testing-library/react';
import { CourtesyPage } from './CourtesyPage';
import '@testing-library/jest-dom';
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
  useNavigate: jest.fn(),
  useLoaderData: jest.fn()
}));

describe('UserRoute', () => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CourtesyPage />
      </QueryClientProvider>
    );
  });
});
