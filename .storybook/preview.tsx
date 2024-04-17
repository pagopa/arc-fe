import React from 'react';
import type { Preview } from '@storybook/react';
import { Theme } from '../src/utils/style';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [ (Story) => (<Theme><Story /></Theme>)],
};

export default preview;
