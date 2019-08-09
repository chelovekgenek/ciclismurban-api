const webpack = require("webpack")
const path = require("path")
const nodeExternals = require("webpack-node-externals")

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  entry: isProduction ? ["./src/main.ts"] : ["webpack/hot/poll?100", "./src/main.ts"],
  target: "node",
  watch: !isProduction,
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
    extensions: [".ts", ".js", "json"],
  },
  plugins: isProduction ? [] : [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js",
  },
}
