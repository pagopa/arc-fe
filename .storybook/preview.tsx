import React from 'react';
import type { Preview } from '@storybook/react';
import { Theme } from '../src/utils/style';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <Theme>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Theme>
    )
  ]
};

export default preview;
