module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:import/typescript'],
    ignorePatterns: ['**/coverage'],
    plugins: ['json-format', '@typescript-eslint'],
    rules: {
        'prettier/prettier': 'error',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': ['error', { props: false }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-use-before-define': ['error', { variables: false }],
        'no-undef': 'off',
        'no-unused-var': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-unused-vars': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '__mocks__/**/*'] }]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2018
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src/']],
                extensions: ['.ts', '.js', '.jsx', '.json']
            }
        },
        'json/json-with-comments-files': ['.vscode/**']
    },
    overrides: [
        {
            files: ['*.svg'],
            rules: {
                'vue/comment-directive': 0
            }
        }
    ]
}
