const baseConfig = require('./jest.config');

const config = {
    ...baseConfig,
    testMatch: ['**/*.test.ts'],
};

module.exports = config;
