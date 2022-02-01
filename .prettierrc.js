module.exports = {
  printWidth: 88,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.{json,yml,tsx,ts}',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
