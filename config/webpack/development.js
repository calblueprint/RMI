const environment = require("./environment");
const webpack = require("webpack");
const FriendlyErrorsWebpack = require("friendly-errors-webpack-plugin");

const config = environment.toWebpackConfig();
config.devtool = "cheap-module-eval-source-map";

config.devServer.quiet = true;

config.plugins.push(new FriendlyErrorsWebpack());

config.output.filename = "[name].bundle.js";
config.watchOptions = {
  aggregateTimeout: 300,
  poll: 1000
};

module.exports = config;
