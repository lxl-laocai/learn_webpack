/**
 * @type {import('webpack').Configuration}
 */
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  mode: "production",
  devtool: false, // cheap-module-source-map / source-map / false
  optimization: {
    chunkIds: "named", //deterministic / named
    usedExports: true, //分析模块是否被使用 tree-shaking
    // 分包
    splitChunks: {
      chunks: "all",
      maxSize: 1024 * 500,
      minSize: 1024,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[name]_[contenthash:6]_vendors.js"
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    },
    minimize: true, // 压缩代码
    minimizer: [
      new TerserPlugin({
        extractComments: false, //注释不抽取
        terserOptions: {
          compress: {
            arguments: true
          },
          mangle: true,
          toplevel: true
        }
      }),
      new CssMinimizerPlugin({
        // css压缩
        parallel: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 提取css至其他文件
      filename: "css/[name]_[contenthash:6].css",
      chunkFilename: "css/[name]_[contenthash:6]_chunk.css"
    }),
    new PurgeCSSPlugin({
      //css tree shaking
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, { nodir: true })
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), //作用域提升
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
      filename: "[path][base].gz"
    })
  ]
};
