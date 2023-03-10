/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // cheap-module-source-map / source-map / false
  devServer: {
    static: ["public"],
    compress: true,
    host: "127.0.0.1",
    port: 3000,
    open: false,
    proxy: {
      "/api": {
        target: "https://localhost:8080/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
