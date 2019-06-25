import Hapi from '@hapi/hapi'

import { route as getAllRoute } from './getAll'
import { route as getByIdRoute } from './getById'

export const routes: Hapi.ServerRoute[] = [
    getAllRoute,
    getByIdRoute,
]
