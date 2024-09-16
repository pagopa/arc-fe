import { defineConfig } from 'vitest/config';
import { config } from "dotenv";
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
		setupFiles: './vitest.setup.js',
		environment: 'jsdom',
		coverage: {
			provider: 'c8',  // Use c8 for coverage if needed
		},
    env: {
      ...config({ path: "./.env.test" }).parsed,
    },
	},
	resolve: {
		alias: {
			// Add all your absolute paths here
			utils: path.resolve(__dirname, './src/utils'),
			routes: path.resolve(__dirname, './src/routes'),
			components: path.resolve(__dirname, './src/components'),
			translations: path.resolve(__dirname, './src/translations'),
			models: path.resolve(__dirname, './src/models'),
			store: path.resolve(__dirname, './src/store'),
		},
	}
});

