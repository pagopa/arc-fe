import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryLoader from '.';
import { QueryFilters } from '@tanstack/react-query';

const mockeduseIsFetching = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useIsFetching: (filters?: QueryFilters) => mockeduseIsFetching(filters)
}));

describe('Query Loader component', () => {
  it('should not render the children when fetching', () => {
    mockeduseIsFetching.mockReturnValueOnce(true);
    render(
      <QueryLoader queryKey="testQueryKey" loaderComponent={<p>test loader</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockeduseIsFetching).toHaveBeenCalledTimes(1);
    expect(mockeduseIsFetching).toHaveBeenCalledWith({ queryKey: ['testQueryKey'] });
    expect(screen.getByText('test loader')).toBeInTheDocument();
    expect(screen.queryByText('test children')).toBeNull();
  });

  it('should render the children when not fetching', () => {
    mockeduseIsFetching.mockReturnValueOnce(false);
    render(
      <QueryLoader queryKey="testQueryKey" loaderComponent={<p>test loader</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockeduseIsFetching).toHaveBeenCalledTimes(1);
    expect(mockeduseIsFetching).toHaveBeenCalledWith({ queryKey: ['testQueryKey'] });
    expect(screen.queryByText('test loader')).toBeNull();
    expect(screen.getByText('test children')).toBeInTheDocument();
  });

  it('should render the fallback component', () => {
    render(
      <QueryLoader queryKey="testQueryKey" fallback={<p>test fallback</p>}>
        <p>test children</p>
      </QueryLoader>
    );
    expect(mockeduseIsFetching).toHaveBeenCalledTimes(0);
    expect(screen.queryByText('test children')).toBeNull();
    expect(screen.getByText('test fallback')).toBeInTheDocument();
  });
});
