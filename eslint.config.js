import { defineConfig, globalIgnores } from 'eslint/config';
import { configs } from 'eslint-config-airbnb-extended/legacy';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  ...configs.react.recommended,
  ...configs.react.hooks,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  {
    files: ['eslint.config.js', 'vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import/no-unresolved': [
        'error',
        { ignore: ['^eslint/config$', '^eslint-config-airbnb-extended/', '^vite$', '^@vitejs/'] },
      ],
    },
  },
  prettierRecommended,
]);
