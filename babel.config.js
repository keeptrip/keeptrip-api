/* eslint-disable */

module.exports = {
    presets: [
        ['@babel/env', {
            'modules': false,
        }],
        '@babel/typescript'
    ],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
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