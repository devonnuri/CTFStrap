module.exports = {
  extends: ['standard', 'eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 100 }],
    'react/display-name': 'never',
  },
};
