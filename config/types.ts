export interface ConfigServer {
    host: string
    port: number
}

export interface ConfigDatabase {
    dialect: string
    host: string
    port: number
    name: string
    user: string
    pass: string
}

export interface Config {
    server: ConfigServer
    database: ConfigDatabase
}