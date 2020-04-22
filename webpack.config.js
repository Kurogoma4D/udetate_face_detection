const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/scripts/index.ts',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /.(ts|tsx)?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src/scripts')],
                exclude: [/node_modules/]
            }
        ]
    },

    plugins: [
        new CopyPlugin([
            { from: 'static', to: 'static' },
            { from: '*.html', to: '.' },
            { from: 'styles', to: 'styles' }
        ],
        { context: 'src' }
        ),
    ],

    devServer: {
        openPage: "index.html",
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        host: '0.0.0.0',
        port: 3000
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ["node_modules"]
    }
};