module.exports = {
  extends: ['react-app', 'wesbos', 'airbnb/hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'lf',
      },
    ],
  },
};
