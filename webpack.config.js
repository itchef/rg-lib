const path = require('path');

const config = {
    entry: [
        "babel-polyfill",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {loader: "babel-loader"}
            }
        ]
    }
};

module.exports = config;
