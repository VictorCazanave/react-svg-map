module.exports = {
  // Fix "localStorage is not available for opaque origins" error
  // https://github.com/jsdom/jsdom/issues/2304
  testURL: 'http://localhost',

  setupTestFrameworkScriptFile: '<rootDir>/jest-setup.js',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: './coverage/',
  collectCoverageFrom: [
    'src/*.jsx'
  ],
};
