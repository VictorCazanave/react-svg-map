/*eslint-env node*/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		}]
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'index.css'
		})
	],
	externals: {
		'react': 'commonjs react'
	}
};
