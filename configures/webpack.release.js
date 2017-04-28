const path = require('path');
const webpackGlobal = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            'babel-polyfill',
            './src/index'
        ],
        'vendor-misc': [
            'axios',
            'q'
        ],
        'vendor-react': [
            'react',
            'react-dom',
            'react-router'
        ],
        'vendor-redux': [
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['./src', './node_modules']
    },
    watch: false,
    module: {
        noParse: [
            /node_modules\/quill\/dist\/quill\.js/, // https://github.com/zenoamaro/react-quill#bundling-with-webpack
            /node_modules\/less\/dist\/less\.js/
        ],
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
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
        ]
    },
    plugins: [
        new webpackGlobal.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpackGlobal.optimize.CommonsChunkPlugin({
            // names는 실제 스크립트 로드의 역순으로 작성
            names: [
                'app',
                'vendor-redux',
                'vendor-react',
	            'vendor-misc'
            ],
            minChunks: Infinity
        }),
        new webpackGlobal.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        })
    ]
};
