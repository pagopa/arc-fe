import { configDefaults, defineConfig } from 'vitest/config';
import { config } from 'dotenv';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './vitest.setup.mts',
    environment: 'jsdom',
		clearMocks: true,
		watch: false,
		silent: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html', 'lcov'],
      reportOnFailure: true,
      exclude: [
        ...configDefaults.exclude,
				'**/*.test.ts?(x)',
				'**/*.styles.ts?(x)',
				'src/__tests__/',
        'src/stories/',
        'src/index.tsx',
        'src/App.tsx',
        'src/global.d.ts',
        'src/components/Layout.tsx',
        'src/utils/style.tsx',
        'src/models/',
      ],
      include: ['src/**/*.ts?(x)'],
      thresholds: {
        lines: 80,
        branches: 80
      }
    },
    env: {
      ...config({ path: './.env.test' }).parsed
    },
    include: ['**/*.test.ts?(x)']
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
      utils: path.resolve(__dirname, './src/utils'),
      __tests__: path.resolve(__dirname, './src/__tests__')
    }
  }
});
