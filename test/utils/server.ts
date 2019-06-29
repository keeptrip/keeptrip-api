import config from 'config'

import { Server } from '@src/Server';
import { routes } from '@src/controllers';

export const createServer = () => {
    const server = new Server(config.get('server.host'), Number(config.get('server.port')))
    server.routes = routes

    return server
}

export const prepareServer = async (server: Server): Promise<Server> => {
    await server.prepare()
    return server
}

export const stopServer = async (server: Server): Promise<Server> => {
    await server.stop()
    return server
}