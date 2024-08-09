import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PreLoginLayout } from './PreLoginLayout';
import '@testing-library/jest-dom';
import i18n from 'translations/i18n';

void i18n.init({
  resources: {}
});

const mockedChangeLanguage = jest.fn();
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => 'data'
  })
);
jest.mock('utils', () => ({
  config: {
    assistanceLink: 'string'
  },
  hooks: {
    useLanguage: () => ({
      language: 'en',
      changeLanguage: mockedChangeLanguage
    })
  }
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
    const windowSpy = jest.spyOn(window, 'open');

    const assistanceButton = screen.getByText('Assistenza');
    fireEvent.click(assistanceButton);
    expect(windowSpy).toHaveBeenCalled();
  });
});
