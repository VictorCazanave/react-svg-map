/*eslint-env node*/
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './example/src/index.jsx',
	module: {
		rules: [{
			test: /\.jsx?/,
			exclude: /node_modules/,
			use: [
				'babel-loader',
				{
					loader: 'eslint-loader',
					options: {
						emitWarning: true, // @note: only for development
					}
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
			template: './example/src/index.html',
			filename: './index.html'
		})
	]
};
