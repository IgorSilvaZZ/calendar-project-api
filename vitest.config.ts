import tsConfigPaths from "vite-tsconfig-paths"

import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsConfigPaths()],
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['node_modules', 'dist'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			reportsDirectory: './coverage',
			exclude: [
				'node_modules/',
				'dist/',
				'**/*.d.ts',
				'**/*.config.ts',
				'src/**/*.{test,spec}.{js,ts}',
			],
		}
	},
})