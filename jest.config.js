// eslint-disable-next-line import/no-extraneous-dependencies
const { jsWithTs } = require('ts-jest/presets')

module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    transform: {
        ...jsWithTs.transform,
        '^.+\\.vue$': '@vue/vue3-jest'
    },
    transformIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jsdom',
    rootDir: 'src',
    clearMocks: true,
    restoreMocks: true
}
