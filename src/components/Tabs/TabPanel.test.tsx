import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPanel from './TabPanel';
import '@testing-library/jest-dom';

describe('TabPanel Component', () => {
  test('renders children when value matches activeValue', () => {
    render(
      <TabPanel value={1} activeValue={1}>
        <div>Child Content</div>
      </TabPanel>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('hides children when value does not match activeValue', () => {
    render(
      <TabPanel value={1} activeValue={2}>
        <div>Child Content</div>
      </TabPanel>
    );

    expect(screen.queryByText('Child Content')).not.toBeVisible();
  });
});
