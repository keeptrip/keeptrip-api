const path = require("path")
const merge = require("webpack-merge")
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPlugin = require("html-webpack-plugin")

const rootPath = __dirname

const config = {
    mode: "development",
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
    }
}

const serverConfig = merge(config, {
    name: "server",

    target: "node",
    entry: [
        "regenerator-runtime/runtime",
        path.join(rootPath, "server/index.ts")
    ],
    output: {
        path: path.join(rootPath, "server-dist"),
        filename: "[name].bundle.js"
    },
    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.(js|ts)/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/env", {
                                "modules": false,
                            }],
                            "@babel/typescript"
                        ],
                        plugins: [
                            "@babel/proposal-class-properties",
                            "@babel/proposal-object-rest-spread"
                        ]
                    }
                }
            }
        ]
    }
})

module.exports = [
    serverConfig
]