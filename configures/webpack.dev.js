const path = require('path');
const webpackGlobal = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['./src', './node_modules']
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ],
        noParse: [
            /node_modules\/quill\/dist\/quill\.js/, // https://github.com/zenoamaro/react-quill#bundling-with-webpack
            /node_modules\/less\/dist\/less\.js/
        ]
    },
    plugins: [
        new webpackGlobal.NoEmitOnErrorsPlugin(),
        new webpackGlobal.HotModuleReplacementPlugin()
    ]
};
