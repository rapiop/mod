const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        mod: './index.js',
        amd: ['./index.js', './src/resolver/amd.ts'],
        global: ['./index.js', './src/resolver/global.ts'],
        'css-lazy': ['./index.js', './src/resolver/css-lazy.ts'],
        'style-lazy': ['./index.js', './src/resolver/style-lazy.ts'],
        all: [
            './index.js',
            './src/resolver/amd.ts',
            './src/resolver/global.ts',
            './src/resolver/css-lazy.ts',
            './src/resolver/style-lazy.ts'
        ]
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /(\.js|\.jsx|\.ts|\.tsx)$/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: require('./babel.config.js')
                            }
                        ],
                        exclude: /node_modules(?![/|\\]@ucloud[/|\\]console-dev-dependences[/|\\]scripts[/|\\]template[/|\\])/
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
