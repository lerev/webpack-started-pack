'use strict';

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const commonsPlugins = new webpack.optimize.CommonsChunkPlugin('shared');

const config = {
    context: path.resolve(__dirname, 'frontend'),
    entry: {
        home: './js/app'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[id].js',
        library: '[name]'
    },

    plugins: [
        new webpack.EnvironmentPlugin('NODE_ENV'),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, 'frontend', 'index.pug')
        }),
        new ExtractTextPlugin({
            filename: "assets/css/[name].css",
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jquery': 'jquery',
            'jQuery': 'jquery'
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },

    devtool: "source-map",

    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            //     loader: 'html-loader'
            // },
            {
                test: /\.(pug|jade)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            exports: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(js|es6|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg|ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 80000,
                            name: 'assets/[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6']
    }
};

module.exports = config;