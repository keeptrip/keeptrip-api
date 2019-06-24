import Hapi from '@hapi/hapi'

import { rootRoute } from './rootRoute'

export const routes: Hapi.ServerRoute[] = [
    rootRoute,
]
