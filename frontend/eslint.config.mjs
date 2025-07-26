import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';
import react from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

export default [
  // Set browser environment globals
  { languageOptions: { globals: globals.browser } },

  // Include recommended JavaScript rules
  js.configs.recommended,

  // Include React recommended config and JSX runtime config
  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: 'detect' },
      },
    },
    reactJsx,
  ]),

  // Add React Hooks plugin and disable no-unused-vars
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
    },
  },

  { ignores: ['dist/'] },
];
