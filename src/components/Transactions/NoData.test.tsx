import React from 'react';
import { render, screen } from '@testing-library/react';
import NoData from './NoData';
import '@testing-library/jest-dom';

describe('NoData component', () => {
  it('renders without crashing', () => {
    render(<NoData title="title" text="text" />);
  });

  it('renders texts passed as props correctly', () => {
    render(<NoData title="title" text="text" />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
