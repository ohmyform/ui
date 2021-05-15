module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/no-autofocus': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
