

module.exports = {
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
