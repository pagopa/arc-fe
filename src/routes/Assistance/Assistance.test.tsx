import React from 'react';
import { render } from '@testing-library/react';
import Assistance from './Assistance';
import '@testing-library/jest-dom';

describe('AssistanceRoute', () => {
  it('renders without crashing', () => {
    render(<Assistance />);
  });
});
