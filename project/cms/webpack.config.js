const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    //入口
    entry: {
        main: './src/main.js',
    },
    //出口
    output: {
        path: __dirname + '/dist/',
        filename: 'build.js',
    },
    //模块
    module: {
        loaders: [{
            test: /.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader'
        }, {
            test: /.less$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
        }, {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015'],
                plugins: ['transform-runtime'],
            }
        }, {
            test: /.vue$/,
            loader: 'vue-loader'
        }, {
            test: /.(png|jpg|svg|ttf|gif|jpeg)$/,
            loader: 'url-loader?limit=4096'
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
    //插件
}