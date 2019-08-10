const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// paths
const projectPath = path.resolve(__dirname, '..');
const buildPath = path.join(projectPath, 'build');
const srcPath = path.join(projectPath, 'src');
const appPath = path.join(srcPath, 'app');

const config = {
  entry: path.join(appPath, 'index.tsx'),
  output: {
    filename: 'bundle.js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: srcPath,
        loader: 'ts-loader'
      },
      {
        test: /\.(sass|scss)$/,
        include: projectPath,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]---[hash:base64:5]'
              },
              importLoaders: 1   // make sure sass-loader is used on imported assets
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        include: projectPath,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']  // order is important. give typescript precedence when js file already exists.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.html')
    })
  ],
  devServer: {
    contentBase: buildPath
  },
  devtool: 'source-map',
  mode: 'development'
};

module.exports = config;