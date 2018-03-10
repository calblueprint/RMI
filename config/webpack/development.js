const environment = require('./environment');
const webpack = require('webpack');
const FriendlyErrorsWebpack = require('friendly-errors-webpack-plugin');

const config = environment.toWebpackConfig();
config.devtool = 'cheap-module-eval-source-map';
// config.devServer.hot = true;
config.devServer.quiet = true;
config.devServer.overlay = true;

// config.plugins.push(new webpack.NamedModulesPlugin());
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new FriendlyErrorsWebpack());

// config.module.rules.push({
//   test: /\.(s*)css$/,
//   use: ["style-loader", "css-loader", "sass-loader"]
// });

config.output.filename =  '[name].bundle.js';

module.exports = config;
