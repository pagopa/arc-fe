import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorFallback } from 'components/ErrorFallback';
import { ArcErrors, ArcRoutes } from 'routes/routes';
import { Navigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  Navigate: vi.fn()
}));

describe('ErrorFallback', () => {
  it('should navigate to ArcRoutes.COURTESY_PAGE, error 400 (generic)', () => {
    render(<ErrorFallback />);
    expect(Navigate).toHaveBeenCalledWith(
      {
        to: ArcRoutes.COURTESY_PAGE.replace(':error', ArcErrors['400'])
      },
      {}
    );
  });
});
