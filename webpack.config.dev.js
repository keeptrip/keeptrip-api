const path = require("path")
const webpack = require("webpack")
const nodemon = require("nodemon")
const merge = require("webpack-merge")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const mainConfig = require('./webpack.config')

const rootPath = __dirname

class NodemonCustomPlugin {
    constructor() {
        this.nodemon = null
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('NodemonCustomPlugin', (compilation) => {
            if (this.nodemon === null) {
                this.nodemon = nodemon({
                    script: "dist/dev.bundle.js",
                    watch: false
                }).on('log', ({ message }) => {
                    console.log(`[Nodemon]: ${message}`)
                })
            } else {
                this.nodemon.emit("restart")
            }
        })
    }
}

module.exports = merge(mainConfig, {
    entry: [
        "regenerator-runtime/runtime",
        path.join(rootPath, "src", "index.ts")
    ],
    output: {
        filename: 'dev.bundle.js'
    },

    watch: true,

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
    },

    plugins: [
        new NodemonCustomPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: 'dev.stats.json'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['!prod.*']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})