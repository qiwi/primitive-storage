module.exports = {
    extends: [
      'eslint-config-qiwi',
      'prettier',
    ],
    overrides: [{
      files: ['./src/**/*.ts'],
      rules: {
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-null': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      },
    }]
  };