/* eslint-disable */
const config = require('config')

const { database: dbConfig } = config
const env = process.env.NODE_ENV || 'development'

module.exports = {
  [env]: {
    username: dbConfig.user,
    password: dbConfig.pass,
    database: dbConfig.name,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
  }
}