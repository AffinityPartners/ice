module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@next/next/no-img-element': 'off', // We'll use next/image later
    '@next/next/no-html-link-for-pages': 'off', // Allow <a> tags for navigation
    'react/no-unescaped-entities': 'off', // Allow quotes and apostrophes in JSX text
  },
};
