/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.ts"],
  globalSetup: "<rootDir>/src/__tests__/e2e/jest.globalSetup.ts", // Run once before all test suites
  globalTeardown: "<rootDir>/src/__tests__/e2e/jest.globalTeardown.ts", // Run once after all test suites
};
