const path = require('path')

module.exports = {
    entry: './src/phoenix-websocket-network-interface.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'phoenix-websocket-network-interface.js',
        library: 'PhoenixWebSocketNetworkInterface',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
}