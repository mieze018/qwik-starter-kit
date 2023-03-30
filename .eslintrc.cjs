module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:qwik/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-spread': 'off',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-imports': 'warn',
    // 未使用のインポートを自動で削除
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // 相対パスのimportを禁止
    'no-restricted-imports': [
      'error',
      {
        patterns: ['./', '../'],
      },
    ],
    // consoleを禁止
    'no-console': 'error',
    // 行間を開ける
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
    ],
  },
}
