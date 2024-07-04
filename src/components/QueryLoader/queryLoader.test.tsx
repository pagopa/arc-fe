import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryLoader from '.';
import { QueryFilters } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

const mockedUseIsFetching = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useIsFetching: (filters?: QueryFilters) => mockedUseIsFetching(filters)
}));

jest.mock('@mui/material', () => ({
  CircularProgress: jest.fn()
}));

describe('Query Loader component', () => {
  it('should not render the children when fetching', () => {
    mockedUseIsFetching.mockReturnValue(1);
    render(
      <QueryLoader queryKey="testQueryKey" loaderComponent={<p>test loader</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockedUseIsFetching).toHaveBeenCalledTimes(1);
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
    expect(mockedUseIsFetching).toHaveBeenCalledTimes(1);
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
    expect(mockedUseIsFetching).toHaveBeenCalledTimes(1);
    expect(CircularProgress).toHaveBeenCalled();
  });

  it('should not render children because a minum delay (5000) is provided', () => {
    mockedUseIsFetching.mockReturnValue(1);
    render(
      <QueryLoader queryKey="testQueryKey" atLeast={5000}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockedUseIsFetching).toHaveBeenCalled();
    expect(mockedUseIsFetching).toHaveBeenCalledWith({ queryKey: ['testQueryKey'] });
    expect(CircularProgress).toHaveBeenCalled();
    expect(screen.queryByText('test children')).toBeNull();
  });
});
