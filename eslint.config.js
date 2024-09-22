import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const allRulesOff = Object.fromEntries(
  Object.keys(js.configs.recommended.rules).map((rule) => [rule, 'off'])
);

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...allRulesOff, // Turn off all base rules
      ...Object.fromEntries(
        Object.keys(react.configs.recommended.rules).map((rule) => [rule, 'off'])
      ),
      ...Object.fromEntries(
        Object.keys(react.configs['jsx-runtime'].rules).map((rule) => [rule, 'off'])
      ),
      ...Object.fromEntries(
        Object.keys(reactHooks.configs.recommended.rules).map((rule) => [rule, 'off'])
      ),
      // Example of turning off specific rules
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': 'off',
      'no-console': 'off',
      'react/prop-types': 'off',
    },
  },
];
