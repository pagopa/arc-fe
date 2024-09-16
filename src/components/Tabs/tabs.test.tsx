import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/vi-dom';
import Tabs, { TabsProps } from 'components/Tabs';
import React from 'react';

const tabs: TabsProps['tabs'] = [
  { title: 'tab1', content: <>panel1</> },
  { title: 'tab2', content: <>panel2</> },
  { title: 'tab3', content: <>panel3</>, disabled: true }
];

describe('Tabs component', () => {
  it('should render as expected', () => {
    render(<Tabs tabs={tabs} />);
  });

  it('should change active tab on tab click', () => {
    render(<Tabs tabs={tabs} />);
    const tabElements = screen.getAllByRole('tab');
    fireEvent.click(screen.getByText('tab1')); // Click on the first tab

    expect(tabElements[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('panel1')).toBeVisible();

    fireEvent.click(screen.getByText('tab2')); // Click on the third tab

    expect(tabElements[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('panel2')).toBeVisible();
  });

  it('should not change on a disabled tab click', () => {
    render(<Tabs tabs={tabs} />);
    const tabElements = screen.getAllByRole('tab');

    fireEvent.click(screen.getByText('tab1')); // Click on the first tab

    expect(tabElements[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('panel1')).toBeVisible();

    fireEvent.click(screen.getByText('tab3')); // Click on the third tab

    expect(tabElements[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('panel1')).toBeVisible();
    expect(screen.getByText('panel3')).not.toBeVisible();
  });

  it('should correctly hide tabs navigation', () => {
    render(<Tabs hideTabs initialActiveTab={1} tabs={tabs} />);
    expect(screen.getByText('panel1')).not.toBeVisible();
    expect(screen.getByText('panel2')).toBeVisible();
    expect(screen.getByText('panel3')).not.toBeVisible();
    expect(screen.getByText('tab1')).not.toBeVisible();
    expect(screen.getByText('tab2')).not.toBeVisible();
    expect(screen.getByText('tab3')).not.toBeVisible();
  });

  it('should correctly render when tabs is empty', () => {
    render(<Tabs tabs={[]} />);
  });

  it('renders correct number of tabs and tab panels', () => {
    render(<Tabs tabs={tabs} />);
    const tabElements = screen.getAllByRole('tab');
    const tabPanelElements = screen.getAllByRole('tabpanel');
    expect(tabElements).toHaveLength(3); // 3 tabs
    expect(tabPanelElements).toHaveLength(1); // 1 tab panels
  });
});
