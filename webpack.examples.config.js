/*eslint-env node*/
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
	return {
		entry: './examples/src/index.jsx',
		mode: process.env.NODE_ENV ?? 'development',
		performance: {
			hints: false // Disable assets limit
		},
		module: {
			rules: [{
				test: /\.(jsx?|tsx?)/,
				include: [path.resolve(__dirname, 'examples'), path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				loader: 'babel-loader',
			}, {
				test: /\.(css|s[ac]ss)$/,
				include: [path.resolve(__dirname, 'examples'), path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}, {
				test: /\.html$/,
				exclude: /node_modules/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			}]
		},
		resolve: {
			extensions: ['.json', '.js', '.jsx'],
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './examples/src/index.html',
				filename: './index.html'
			})
		],
		output: {
			path: path.resolve(__dirname, 'examples/dist'),
			filename: 'index.js',
		},
	};
};
