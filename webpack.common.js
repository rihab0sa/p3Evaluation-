const path = require('path'); // Ensure path is required
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    module: {
        rules: [
            {
                test: /\.js$/, // Correct regex without quotes
                exclude: /node_modules/,
                use: "babel-loader" // Use 'use' instead of 'loader'
            },
        ],
    },
    resolve: {
        fallback: {
            "vm": false // Use an empty module for 'vm'
        }
    },
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
        minimize: true,
    },
};