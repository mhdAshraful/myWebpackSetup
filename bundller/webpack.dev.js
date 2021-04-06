const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');


module.exports = merge(
    commonConfig,
    {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8081),
            contentBase: './dist',
            watchContentBase: true,
            open: true,
            https: false,
            useLocalIp: true,
            disableHostCheck: true,
            overlay: true,
            after: function (app, server, compiler) {
                const port = server.options.port
                const https = server.options.https ? 's' : ''
                const localIp = ip.v4.sync()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`
                console.log(`Project running at:  - ${(domain1)}\n  - ${(domain2)}`)
            }
        },

    });