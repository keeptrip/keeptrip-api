import config from 'config'

import { Server } from './Server'
import { routes } from './routes'

import './database'

interface ServerConf {
    host: string;
    port: number;
}

const serverConf: ServerConf = config.get('server')

async function start(): Promise<void> {
    const server = new Server(serverConf.host, serverConf.port)

    server.routes = routes

    await server.prepare()
    await server.start()
}

start()
