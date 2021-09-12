module.exports = {
	"roots": [
    "<rootDir>",
  ],
	"modulePaths": [
    "<rootDir>",
  ],
	"moduleDirectories": [
    "node_modules"
  ],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	// Fix "localStorage is not available for opaque origins" error
	// https://github.com/jsdom/jsdom/issues/2304
	testURL: 'http://localhost',

	// Mock imported scss file
	// https://jestjs.io/docs/en/webpack.html#handling-static-assets
	moduleNameMapper: {
		'\\.scss$': '<rootDir>/__tests__/__mocks__/styleMock.js'
	},
	testEnvironment: "jsdom",

	testMatch: ['**/__tests__/**/*.test.js'],
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: [
		'src/*.jsx'
	],
};
