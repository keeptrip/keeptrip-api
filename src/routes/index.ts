import Hapi from '@hapi/hapi'

import { rootRoute } from './rootRoute'

const output: Hapi.ServerRoute[] = [
    rootRoute,
]

export default output
