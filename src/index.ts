import 'reflect-metadata'
import config from 'config'

import { startServer, stopServer } from './Server'

import './database'

startServer(config.get('server.port'))
