const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    experiments: {
        asset: true
    },

    plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
        template: 'index.html'
    })],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                loader: 'file-loader',
                exclude: /(temp)/,
                options: {
                    outputPath: 'img/',
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                enforce: 'pre',
                options: {
                    fix: true,
                },
            },
        ],
    },

    devServer: {
        open: true
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            chunks: 'all'
        }
    }
}
