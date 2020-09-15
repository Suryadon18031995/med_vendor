<<<<<<< HEAD


const webpack = require('webpack');
const path = require('path');
const Jarvis = require('webpack-jarvis');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.bundle.js',
    },
    plugins: [
        new Jarvis({
            port: 1337,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader',
            },
        ],
    },
};
=======


const webpack = require('webpack');
const path = require('path');
const Jarvis = require('webpack-jarvis');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.bundle.js',
    },
    plugins: [
        new Jarvis({
            port: 1337,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader',
            },
        ],
    },
};
>>>>>>> 26a72402f14215350a5e88c808d1bb904903918a
