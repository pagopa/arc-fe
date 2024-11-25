import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryLoader from '.';
import { QueryFilters } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

const mockedUseIsFetching = vi.fn();
vi.mock('@tanstack/react-query', () => ({
  useIsFetching: (filters?: QueryFilters) => mockedUseIsFetching(filters)
}));

vi.mock('@mui/material', () => ({
  CircularProgress: vi.fn()
}));

describe('Query Loader component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render the children when fetching', () => {
    mockedUseIsFetching.mockReturnValue(1);
    render(
      <QueryLoader queryKey="testQueryKey" loaderComponent={<p>test loader</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockedUseIsFetching).toHaveBeenCalledWith({ queryKey: ['testQueryKey'] });
    expect(CircularProgress).not.toHaveBeenCalled();
    expect(screen.getByText('test loader')).toBeInTheDocument();
    expect(screen.queryByText('test children')).toBeNull();
  });

  it('should render the children when not fetching', () => {
    mockedUseIsFetching.mockReturnValue(0);
    render(
      <QueryLoader queryKey="testQueryKey" loaderComponent={<p>test loader</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(screen.queryByText('test loader')).toBeNull();
    expect(screen.getByText('test children')).toBeInTheDocument();
  });

  it('should render the default loader component', () => {
    mockedUseIsFetching.mockReturnValue(1);
    render(
      <QueryLoader queryKey="testQueryKey">
        <p>test children</p>
      </QueryLoader>
    );
    expect(CircularProgress).toHaveBeenCalled();
  });

  it('should not render children because a minum delay (5000) is provided', () => {
    mockedUseIsFetching.mockReturnValue(1);
    render(
      <QueryLoader queryKey="testQueryKey" atLeast={5000}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockedUseIsFetching).toHaveBeenCalledWith({ queryKey: ['testQueryKey'] });
    expect(CircularProgress).toHaveBeenCalled();
    expect(screen.queryByText('test children')).toBeNull();
  });
});
