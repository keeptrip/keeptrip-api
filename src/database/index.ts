import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import config from 'config'

import { Trip } from '@src/database/models/Trip.model'

interface DBConfig {
    dialect: string;
    host: string;
    port: number;
    name: string;
    user: string;
    pass: string;
}

const dbConfig: DBConfig = config.get('database')

export const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.name,
    username: dbConfig.user,
    password: dbConfig.pass,
    logging: false,
})

sequelize.addModels([
    Trip
])
