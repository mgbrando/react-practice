const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const bootstrapEntryPoints = require("./webpack.bootstrap.config");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");

const isProd = process.env.NODE_ENV === "production";
const cssDev = ["style-loader", "css-loader", "sass-loader"];
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ["css-loader", "sass-loader"]
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd
  ? bootstrapEntryPoints.prod
  : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app: "./src/app.js",
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=images/[name].[ext]",
          //"file-loader?name=[name].[ext]&outputPath=images/",
          "image-webpack-loader"
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
      },
      { test: /\.(ttf|eot)$/, loader: "file-loader?name=fonts/[name].[ext]" },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: "imports-loader?jQuery=jquery"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Project Demo",
      /*minify: {
        collapseWhitespace: true
      },*/
      hash: true,
      template: "./src/index.html"
    }),
    new ExtractTextPlugin({
      filename: "css/[name].css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, "src/*.html")),
      moduleExtensions: [".js"]
    })
  ]
};
