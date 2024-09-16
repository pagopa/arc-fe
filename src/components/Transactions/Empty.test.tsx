import React from 'react';
import { render } from '@testing-library/react';
import { Empty } from './';
import '@testing-library/vi-dom';

describe('EmptyComponent', () => {
  it('renders without crashing', () => {
    render(<Empty />);
  });
});
