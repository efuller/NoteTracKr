'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        './app/scss/style.scss',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'views/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            //test: /\.scss$/,
            //loader: 'style!css!autoprefixer!sass?includePaths[]=' + encodeURIComponent(require('bourbon').includePaths) +
            //    '&includePaths[]=' + encodeURIComponent(require('neat').includePaths)

            // https://github.com/tedpennings/site/blob/294c7a2b1a4de099cb408858aeecc2b045b29129/webpack.config.dev.js
            test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded&' +
            'includePaths[]=' + encodeURIComponent(require('node-bourbon').includePaths) +
            '&includePaths[]=' + encodeURIComponent(require('node-neat').includePaths[1]) +
            '&includePaths[]=' + encodeURIComponent(require('node-normalize-scss').includePaths)
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};