/**
 * @type {import('webpack').Configuration}
 */
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const devConfig = require("./development.config");
const prodConfig = require("./production.config");

function commonConfig(isEnv) {
  return {
    entry: {
      index: {
        import: "./src/main.js",
        dependOn: "shared"
      },
      styleMain: {
        import: "./src/styleMain.js",
        dependOn: "shared"
      },
      reactMain: {
        import: "./src/reactMain.js",
        dependOn: "shared"
      },
      shared: ["axios"]
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "../build"),
      filename: "js/[name]_[contenthash:6]_bundle.js",
      chunkFilename: "js/[name]_[contenthash:6]_chunk.js"
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".wasm", ".css", ".less", ".scss"]
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: [isEnv === "development" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        },
        {
          test: /\.s[ac]ss$/,
          use: [isEnv === "development" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        cache: true,
        minify:
          isEnv === "development"
            ? false
            : {
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true,
                removeTagWhitespace: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: {
                  mangle: {
                    topLevel: true
                  }
                }
              }
      }),
      new BundleAnalyzerPlugin()
    ]
  };
}

module.exports = function (env) {
  let isEnv = env === "development" ? devConfig : prodConfig;
  return merge(commonConfig(env), isEnv);
};
