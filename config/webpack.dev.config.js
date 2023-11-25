const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
  mode: 'development', // 开发模式
  entry: path.join(__dirname, '../src/index.tsx'), // 项目入口，处理资源文件的依赖关系
  // entry: {
  //   game: path.join(__dirname, '../src/game.tsx'),
  //   index: path.join(__dirname, '../src/index.tsx')
  // },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'bundle.js' // 使用webpack-dev-sevrer启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['eslint-loader'],
      //   enforce: 'pre'
      // }
      // {
      //   test: /\.css$/,
      //   exclude: /\.min\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.min\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ]
  },
  plugins: [
    new ESLintPlugin({
      files: 'src/**/*.(js|jsx|ts|tsx)',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      overrideConfigFile: '.eslintrc.js',
      lintDirtyModulesOnly: true,
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false
    }),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.join(__dirname, '../build/index.html'),
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: './game.html',
      template: path.join(__dirname, '../build/game.html'),
      inject: 'body'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '../src/')
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 12345,
    open: {
      target: 'http://localhost:12345'
    },
    proxy: {
      '/api/mystery/**': {
        target: 'https://mystery.tuanzhzh.com/',
        secure: false,
      }
    }
  }
}

module.exports = merge(devConfig, baseConfig)
