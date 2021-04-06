const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new FaviconsWebpackPlugin({
            logo: './src/1.png', // svg works too!
            mode: 'webapp', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
            devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default 
            favicons: {
                appName: 'mywebpacksetup',
                appDescription: 'Webpack Starter setup',
                developerName: 'Ashraful',
                developerURL: null, // prevent retrieving from the nearest package.json
                background: '#ddd',
                theme_color: '#333',
                icons: {
                    coast: false,
                    yandex: false
                }
            }
        })
        // new MiniCSSExtractPlugin(),
    ],
    module: {
        rules: [
            //HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            //js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            // sass scss
            {
                test: /\.s[a|c]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        }
                    },
                ]
            },
            //images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images/'
                    }
                }]
            },
            //fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            //shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            },
        ]
    }

};