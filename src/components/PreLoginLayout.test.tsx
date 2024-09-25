import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PreLoginLayout } from './PreLoginLayout';
import '@testing-library/jest-dom';
import { i18nTestSetup } from '__tests__/i18nTestSetup';

i18nTestSetup({});

const mockedChangeLanguage = vi.fn();
global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => 'data'
  })
);
vi.mock('./utils/config', () => ({
  assistanceLink: 'string'
}));
vi.mock('./utils/hooks', () => ({
  useLanguage: () => ({
    language: 'en',
    changeLanguage: mockedChangeLanguage
  })
}));

describe('PreLoginLayout Component', () => {
  it('renders without errors', () => {
    render(
      <PreLoginLayout>
        <div>children</div>
      </PreLoginLayout>
    );
    expect(screen.getByText('Assistenza')).toBeInTheDocument();
  });

  it('opens assistance link ', () => {
    render(
      <PreLoginLayout>
        <div>children</div>
      </PreLoginLayout>
    );
    const windowSpy = vi.spyOn(window, 'open');

    const assistanceButton = screen.getByText('Assistenza');
    fireEvent.click(assistanceButton);
    expect(windowSpy).toHaveBeenCalled();
  });
});
