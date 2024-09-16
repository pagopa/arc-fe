import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/vi-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';

// A component that throws an error for testing purposes
const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let errorSpy: vi.SpyInstance;

  beforeAll(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should render fallback UI when a child component throws an error', () => {
    const fallbackUI = <div>Something went wrong.</div>;

    render(
      <ErrorBoundary fallback={fallbackUI}>
        <div>
          <p> test </p>
          <ErrorThrowingComponent />
        </div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('should render children when no error is thrown', () => {
    const ChildComponent = () => <div>No errors here</div>;

    render(
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('No errors here')).toBeInTheDocument();
  });
});
