import Hapi from '@hapi/hapi'

import { route as createRoute } from './create'
import { route as findAllPublicRoute } from './findAllPublic'
import { route as findOneByIdRoute } from './findOneById'
import { route as updateRoute } from './update'
import { route as destroyRoute } from './destroy'

export const routes: Hapi.ServerRoute[] = [
    createRoute,
    findAllPublicRoute,
    findOneByIdRoute,
    updateRoute,
    destroyRoute,
]
