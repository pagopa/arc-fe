import vite from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import viteTsconfig from 'vite-tsconfig-paths';

const { mergeConfig } = vite;

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../src/stories/assets'],
  docs: {
    autodocs: 'tag'
  },
    async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [viteTsconfig()],
    });
  },
};

export default config;
