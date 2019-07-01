/* eslint-disable */

module.exports = {
    presets: [
        ['@babel/env', {
            modules: false,
            targets: {
                node: 'current'
            }
        }],
        '@babel/typescript'
    ],
    plugins: [
        '@babel/proposal-object-rest-spread',
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['module-resolver', {
            root: ['./src', './test'],
            alias: {
                '@src': './src',
                '@test': './test'
            },
            extensions: ['.js', '.ts']
        }]
    ]
}