const path = require("path")
const merge = require("webpack-merge")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const mainConfig = require('./webpack.config')

const rootPath = __dirname

module.exports = merge(mainConfig, {
    entry: [
        path.join(rootPath, "src", "index.ts")
    ],
    output: {
        filename: "prod.bundle.js"
    },

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
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: 'prod.stats.json'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['prod.*']
        }),
    ]
})