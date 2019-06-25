import Hapi from '@hapi/hapi'

import { route as rootRoute } from './rootRoute'

import { routes as tripRoutes } from './trips'

export const routes: Hapi.ServerRoute[] = [
    rootRoute,
    ...tripRoutes
]
