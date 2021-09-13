/*eslint-env node*/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          plugins: [
            ['react-remove-properties', { properties: ['data-testid'] }],
          ],
        },
      },
      {
        test: /\.(css|s[ac]ss)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      ignoreOrder: false,
    }),
  ],
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
    },
    'react-dom': {
      amd: 'react-dom',
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      umd: 'react-dom',
    },
    'prop-types': {
      amd: 'prop-types',
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
    },
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'SVGMap',
    libraryTarget: 'commonjs2',
  },
};
