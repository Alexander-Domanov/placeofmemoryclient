module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/function-component-definition': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-no-useless-fragment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'react/button-has-type': 0,
    'react/display-name': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-array-index-key': 0,
  },
};
