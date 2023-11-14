const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const config = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /\.lazy\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.lazy\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "lazySingletonStyleTag" },
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         mimetype: "image/png",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset",
      },
    ],
  },
  target: "web",
  devtool: "source-map",
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              // Your options for `sharp`
              // https://sharp.pixelplumbing.com/api-output
            },
          },
        },
      }),
    ],
  },
  devServer: {
    hot: true,
    static: { directory: path.join(__dirname, "src") },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["index"],
    }),
    // new CopyWebpackPlugin({ patterns: [{ from: "src/assets", to: "assets" }] }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
