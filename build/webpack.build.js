const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const vars = require('./modifyvars.js')

const rootPath = process.cwd();
console.log('__dirname', __dirname);

module.exports = {
  mode: 'production',
  entry: {
    index: `${rootPath}/build.tsx`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.less$/,
        include: /node_modules|heaven|antd/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars : vars
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        include: rootPath,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(tsx|ts)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
        include: rootPath,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        // this is most important!!
        commonStyles: {
          name: 'common',
          test: (module) => {
            const name = module.nameForCondition && module.nameForCondition();
            if (
              name &&
              ((/node_modules\/@perfma\/heaven/.test(name) &&
                /.(c|le)ss$/.test(name)) ||
                (/node_modules\/antd/.test(name) && /.(c|le)ss$/.test(name)))
            ) {
              return true;
            }

            return false;
          },
          chunks: 'all',
          type: 'css/mini-extract',
          enforce: true,
          priority: 999, // 最高优先级
        },
        styles: {
            name: 'biz', // 可以重命名，可以是xsea/testma
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
        },
      },
    },
  },
  output: {
    path: path.resolve(rootPath, './dist'), // 项目的打包文件路径
    filename: '[name].js',
    clean: true,
    publicPath: '/',
    assetModuleFilename: 'asset/[hash][ext][query]',
  }
}