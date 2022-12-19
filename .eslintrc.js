module.exports = {
    extends: [
      'eslint-config-qiwi',
      'prettier',
    ],
    overrides: [{
      files: ['./src/**/*.ts'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-prototype-builtins': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-null': 'off',
      },
    }]
  };