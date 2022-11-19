module.exports = {
	// Fix "localStorage is not available for opaque origins" error
	// https://github.com/jsdom/jsdom/issues/2304
	testEnvironmentOptions: {
		url: 'http://localhost',
	},
	testEnvironment: 'jsdom',

	// Mock imported scss file
	// https://jestjs.io/docs/en/webpack.html#handling-static-assets
	moduleNameMapper: {
		'\\.scss$': '<rootDir>/__tests__/__mocks__/styleMock.js'
	},

	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	testMatch: ['**/__tests__/**/*.test.js'],
	collectCoverage: true,
	coverageDirectory: './coverage/',
	collectCoverageFrom: [
		'src/*.jsx'
	],
};
