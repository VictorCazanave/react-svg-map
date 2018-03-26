/*eslint-env node*/
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'index.js',
		library: 'SVGMap',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [{
			test: /\.jsx?/,
			exclude: /node_modules/,
			use: [
				'babel-loader',
				{
					loader: 'eslint-loader'
				}
			],
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}]
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx'],
	},
	externals: {
		'react': 'commonjs react'
	}
};
