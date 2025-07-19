import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    // Base ESLint + TypeScript recommended rules
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactRecommended, // Adds React-specific rules
    ],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node, // If you need Node.js globals
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // React Refresh (Vite)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      // Additional rules from CRA's eslint-config-react-app
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'import/no-anonymous-default-export': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/aria-props': 'warn',
      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
  },
);