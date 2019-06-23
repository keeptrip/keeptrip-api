const path = require("path")
const merge = require("webpack-merge")
const nodeExternals = require('webpack-node-externals')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const rootPath = __dirname

module.exports = {
  name: "server",

  target: "node",
  output: {
    path: path.join(rootPath, "dist"),
    filename: "server.bundle.js"
  },

  externals: [nodeExternals()],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
  }
}