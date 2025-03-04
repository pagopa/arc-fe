/**
 * @vitest-environment-options { "url": "https://example.com/" }
 */
import React from 'react';
import { render } from '@testing-library/react';
import CookieBanner from '.';
import '@testing-library/jest-dom';

describe('CookieBanner component', () => {
  it('should render nothing without causing error', async () => {
    process.env.ENV = 'DEV';
    const { container } = render(<CookieBanner />);
    expect(container).toBeEmptyDOMElement();
  });
});
