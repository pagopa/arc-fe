module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: "module"
    },
    plugins: ['@typescript-eslint',],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
    "ignorePatterns": ["**/__integration_tests__/*"],

  };