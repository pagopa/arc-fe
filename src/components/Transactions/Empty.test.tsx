import React from 'react';
import { render } from '@testing-library/react';
import { Empty } from './';
import '@testing-library/jest-dom';

describe('EmptyComponent', () => {
  it('renders without crashing', () => {
    render(<Empty />);
  });
});
