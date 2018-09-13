const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
const devServer = {
    contentBase: './dist',
    hot: true,
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // autoOpenBrowser: false,
}
module.exports = {
    entry: resolve('src/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist'),
    },
    resolve: {
        extensions: ['.js', '.ts', '.d.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: /\.(ts|d.ts)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                    }
                }
            }
        ]
    },
    devServer: devServer,
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}; 