const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge'); // webpack 合并
const webpackBaseConfig = require('./webpack.base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs');
const config = require('./config.json')
var path = require('path')

// fs.open('./src/config/env.js', 'w', function (err, fd) {
//     const buf = 'export default "development";';
//     fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
// });

module.exports = merge(webpackBaseConfig, {
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true,
        proxy: {
            '/mams-rest/*': {
                target: 'http://10.0.49.63:7079/mams-service',

                // target: 'http://10.0.49.62:7079',
                secure: false,
                changeOrigin: true
            },
            '/ems-claim/*': {
                // 开发人员无网关
                // target: 'http://10.52.226.164:7001',
                // pathRewrite: { "^/ems-claim": "" },

                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true
            },
            '/ems-base-data/*': {
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true
            },
            '/biz-m-rest/*': {
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true
            },
            '/org-arch-web/*': {
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true
            },
            '/ems-process-service/*': {
                // 开发人员无网关
                // target: 'http://10.52.226.176:9970',
                // pathRewrite: { "^/ems-process-service": "" },

                // 测试环境
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true,

            },
            '/ems-accountant-job-pool/*': {
                // 开发人员无网关
                // target: 'http://10.52.226.22:7003',
                // pathRewrite: { "^/ems-process-service": "" },

                // 测试环境
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true,

            },
            '/ems-payment/*': {
                // 开发人员无网关
                // target: 'http://10.52.226.22:7003',
                // pathRewrite: { "^/ems-process-service": "" },

                // 测试环境
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true,
            },
            '*': {
                target: 'http://10.0.49.63:7079',
                secure: false,
                changeOrigin: true
            },
        }
    },
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                API: JSON.stringify(config['development'])
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }]),
        new HtmlWebpackPlugin({
            title: 'vue-组件库',
            filename: 'index.html',
            template: './src/template/index.ejs',
            inject: true,
            chunks: ['main']
        }),
    ]
});