module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverage: true,
  testMatch: ["**/__tests__/**/*.test.js"],
  verbose: true,
  setupFiles: ['<rootDir>/tests/__mocks__/db.js'],
};