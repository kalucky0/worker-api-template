import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { 
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    },
    {
        ignores: ['.wrangler', 'node_modules', 'dist', 'build'],
    },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tsConfigs.recommended,
    pluginReact.configs.flat.recommended,
    pluginImport.flatConfigs.recommended,
    pluginImport.flatConfigs.typescript,
    {
        settings: {
            react: {
                version: '18.2.0',
            },
            'import/resolver': {
                'typescript': true,
                'node': true,
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'semi': ['error', 'always'],
            '@typescript-eslint/explicit-function-return-type': ['error'],
            'import/order': [
                'error',
                {
                    'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                    'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
                },
            ],
        },
    },
];