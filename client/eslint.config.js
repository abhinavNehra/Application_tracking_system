import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
    eslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: ['dist/**'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                React: true,
                process: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: ['src'],
                },
            },
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-var-requires': 'error',

            // React rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-uses-react': 'off',

            // General rules
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-unused-vars': 'off',
            'no-undef': 'off', // TypeScript handles this

            // Import rules
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
];