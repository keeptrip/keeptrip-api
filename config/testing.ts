import { Config } from "./types";

const config: Config = {
    server: {
        host: 'localhost',
        port: 80
    },
    database: {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        name: 'keeptrip_test',
        user: 'postgres',
        pass: 'testpass'
    }
}

export default config