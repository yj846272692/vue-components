const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs');
const config = require('./config.json')
var path = require('path')

// fs.open('./src/config/env.js', 'w', function (err, fd) {
//     const buf = 'export default "production";';
//     fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
// });

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: './',//'https://iview.github.io/iview-admin/dist/',
        filename: '[name].[hash].js',
        // chunkFilename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'vendors.[hash].js'
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'vue学习之路',
            filename: 'index.html',
            template: './src/template/index.ejs',
            inject: true,
            chunks: ['main']
        }),
    ]
});