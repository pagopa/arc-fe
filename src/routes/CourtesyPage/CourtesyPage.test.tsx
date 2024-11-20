import React from 'react';
import { render, screen } from '@testing-library/react';
import { CourtesyPage } from '.';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorIconComponent } from './index';

const queryClient = new QueryClient();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [
    {
      get: () => '403'
    }
  ],
  useLoaderData: vi.fn(),
  Link: vi.fn()
}));

describe('UserRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders without crashing', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CourtesyPage />
      </QueryClientProvider>
    );
  });
});

describe('ErrorIconComponent', () => {
  it('should render the ErrorIconComponent correctly', () => {
    render(<ErrorIconComponent code="401" />);
    const imgElement = screen.getByTitle('Expired');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/expired.svg');
  });

  it('should render the ErrorIconComponent default correctly', () => {
    render(<ErrorIconComponent code="900" />);
    const imgElement = screen.getByTitle('Something go wrong');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/pictograms/umbrella.svg');
  });
});