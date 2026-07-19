import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import { fileURLToPath } from 'node:url';

const svelteConfigPath = fileURLToPath(new URL('./svelte.config.js', import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				projectService: true,
				extraFileExtensions: ['.svelte'],
				svelteConfig: svelteConfigPath
			}
		}
	},
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'build/**',
			'.svelte-kit/**',
			'package/**',
			'.env',
			'.env.*',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	}
);
