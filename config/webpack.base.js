const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path')
const getStyleLoaders = () => {
  return {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        ident: 'postcss',
        config: false,
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009' // false将禁用flexbox属性前缀。或者flexbox: "no-2009"仅为最终版本和IE版本的规范添加前缀。
              },
              stage: 3
            }
          ],
          [
            'postcss-px-to-viewport',
            {
              unitToConvert: 'px', // 要转化的单位
              viewportWidth: 750, // UI设计稿的宽度
              unitPrecision: 6, // 转换后的精度，即小数点位数
              propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
              viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
              fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
              // selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
              minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
              mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
              replace: true, // 是否转换后直接更换属性值
              // exclude: /\/node_modules\//, // 设置忽略文件，用正则做目录名匹配
              include: /\/src\//, // 设置仅转换/src/下的文件
              landscape: false // 是否处理横屏情况
            }
          ]
        ]
      }
    }
  }
}
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/pages/Component'),
      requestConfig: path.resolve(__dirname, '../requestConfig'),
      static: path.resolve(__dirname, '../static')
    },
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json'),
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })]

  },
  plugins: [
    // 添加 CopyWebpackPlugin 配置
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'), // 源文件路径
          to: path.resolve(__dirname, '../dist', 'static') // 目标路径
        }
      ]
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        // 使用 babel-loader 来编译处理 js 和 jsx 文件
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.tsx?$/,
        // include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', getStyleLoaders()]
      },
      {
        test: /.less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          getStyleLoaders(),
          'less-loader'
        ]
      }
    ]
  }
}