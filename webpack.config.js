const path = require("path");

module.exports = {
    entry: {
        'index': './src/index.js',
        'index2': './src/index2.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "public")
    },
    devServer: {
        contentBase: path.join(__dirname, "public")
    }
};