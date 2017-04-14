const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const commonsPlugins = new webpack.optimize.CommonsChunkPlugin('shared');

const config = {
    context: path.resolve(__dirname, 'frontend'),
    entry: {
        bundle: [
            './js/app'
        ]
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
            template: path.resolve(__dirname, 'frontend', 'index.pug'),
            filename: "index.html",
            filetype: 'pug'
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
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
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
                test: /\.(css)$/,
                // exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
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
                // exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
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
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 80000,
                    //         name: 'assets/[path][name].[ext]'
                    //     }
                    // },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[path][name].[ext]'
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader'
                    // }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6']
    }
};

module.exports = config;