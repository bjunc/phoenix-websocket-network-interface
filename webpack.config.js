const path = require('path')

module.exports = {
    target: 'node',
    entry: './src/phoenix-websocket-network-interface.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'phoenix-websocket-network-interface.js',
        library: 'PhoenixWebSocketNetworkInterface',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
}