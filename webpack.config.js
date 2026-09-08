const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    app: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: false,
    port: 9000,
    open: true,
    devMiddleware: {
      writeToDisk: true, 
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
            // Disables attributes processing
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          }
          , 
          "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html"
    }),
    new HtmlWebpackPlugin({
        filename: "checkout.html",
        template: "./src/checkout.html"
    }),
    new HtmlWebpackPlugin({
        filename: "login.html",
        template: "./src/login.html"
    }),
    new HtmlWebpackPlugin({
        filename: "signup.html",
        template: "./src/signup.html"
    }),
    new HtmlWebpackPlugin({
        filename: "products.html",
        template: "./src/products.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css"
    }),
    new CssMinimizerPlugin()
  ],
};