const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    common: ['react', 'react-dom'],
    bundle: './lib/SimpleCurrencyInput.js',
    example: './example/src/example.js'
  },
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'example/src/index.html', to: 'index.html' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};