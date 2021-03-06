const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./index')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfig = {
    entry:{
        cesiumTdt: './src/lib/index.js'
    },
    output: {
        path: config.path.libraryRoot,
        filename: '[name].js',
        library: 'cesiumTdt',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                exclude: resolve('node_modules')
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root:path.resolve(__dirname, '..'),
            verbose: true,
            dry: false,
        }),
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

module.exports = baseConfig;