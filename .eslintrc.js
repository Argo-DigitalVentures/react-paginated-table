module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  parser: 'babel-eslint',
  ecmaVersion: 7,
  sourceType: "module",
  ecmaFeatures: {
    impliedStrict: true,
    jsx: true,
    experimentalObjectRestSpread: true
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-plusplus': 0,
    'no-shadow': 0,
  }
};
