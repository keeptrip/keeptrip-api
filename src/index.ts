import config from 'config'

import Server from './Server'
import routes from './routes'

import './database'

interface IServerConf {
    host: string;
    port: number;
}

const serverConf: IServerConf = config.get('server')

async function start() {
    const server = new Server(serverConf.host, serverConf.port)

    server.routes = routes

    await server.prepare()
    await server.start()
}

start()
