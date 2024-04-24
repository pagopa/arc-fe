import * as React from 'react';
import { renderHook, act, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useTabs from './useTabs';
import Tabs from './';

describe('useTabs hook', () => {
  it('should return the inital active tab state correctly', () => {
    const { result } = renderHook(() => useTabs(1));
    expect(result.current.activeTab).toBe(1);
  });

  it('should return the inital 0 index active tab state correctly passing undefined to useTabs', () => {
    const { result } = renderHook(() => useTabs(undefined));
    expect(result.current.activeTab).toBe(0);
  });

  it('should change correctly the active tab state calling the changeActiveTab function', () => {
    const { result } = renderHook(() => useTabs(undefined));
    act(() => {
      result.current.changeActiveTab(3);
    });
    expect(result.current.activeTab).toBe(3);
  });
});

describe('Tabs component', () => {
  const tabOneContent = () => screen.getByText('Tab one content');
  const tabTwoContent = () => screen.getByText('Tab two content');
  const tabOneTitle = () => screen.getByText('Tab one title');
  const tabTwoTitle = () => screen.getByText('Tab two title');

  it('should render as expected', () => {
    render(<Tabs tabs={[{ title: 'Tab one title', content: <>Tab one content</> }]} />);
  });

  it('should change tab correctly', () => {
    render(
      <Tabs
        tabs={[
          { title: 'Tab one title', content: <>Tab one content</> },
          { title: 'Tab two title', content: <>Tab two content</> }
        ]}
      />
    );
    expect(tabTwoContent()).not.toBeVisible();
    fireEvent.click(tabTwoTitle());
    expect(tabTwoContent()).toBeVisible();
  });

  it('should not change tab when disabled', () => {
    render(
      <Tabs
        tabs={[
          { title: 'Tab one title', content: <>Tab one content</> },
          { title: 'Tab two title', content: <>Tab two content</>, disabled: true }
        ]}
      />
    );
    expect(tabTwoTitle()).toBeDisabled();
    expect(tabOneContent()).toBeVisible();
    expect(tabTwoContent()).not.toBeVisible();
    fireEvent.click(tabTwoTitle());
    expect(tabOneContent()).toBeVisible();
    expect(tabTwoContent()).not.toBeVisible();
  });

  it('should correctly render when tabs is empty', () => {
    render(<Tabs tabs={[]} />);
  });

  it('should correctly hide tabs navigation', () => {
    render(
      <Tabs
        hideTabs
        initialActiveTab={1}
        tabs={[
          { title: 'Tab one title', content: <>Tab one content</> },
          { title: 'Tab two title', content: <>Tab two content</> }
        ]}
      />
    );
    expect(tabOneContent()).not.toBeVisible();
    expect(tabTwoContent()).toBeVisible();
    expect(tabOneTitle()).not.toBeVisible();
    expect(tabTwoTitle()).not.toBeVisible();
  });
});
