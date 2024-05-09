/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>src/**/*.ts'],
  coverageDirectory: "coverage",
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  "transform": {
    '.+\\.ts$':'ts-jest'
  }
};

export default config;
