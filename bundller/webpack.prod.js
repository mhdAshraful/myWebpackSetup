const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
    commonConfig,
    {
        mode: 'production',
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin()
        ]
    }
);