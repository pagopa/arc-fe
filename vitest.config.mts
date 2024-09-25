import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './vitest.setup.mts',
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reportOnFailure: true
    },
    env: {
      ...config({ path: './.env.test' }).parsed
    }
  },
  resolve: {
    alias: {
      // Add all your absolute paths here
      components: path.resolve(__dirname, './src/components'),
      hooks: path.resolve(__dirname, './src/hooks'),
      models: path.resolve(__dirname, './src/models'),
      routes: path.resolve(__dirname, './src/routes'),
      store: path.resolve(__dirname, './src/store'),
      stories: path.resolve(__dirname, './src/stories'),
      translations: path.resolve(__dirname, './src/translations'),
      utils: path.resolve(__dirname, './src/utils')
    }
  }
});
