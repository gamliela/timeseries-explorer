module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    "react-hooks",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react-hooks/rules-of-hooks": "error", // checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // checks effect dependencies
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    "browser": true,  // allows use of global variables like "document"
  }
};
