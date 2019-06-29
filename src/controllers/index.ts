import Hapi from '@hapi/hapi'

import { route as rootRoute } from './rootRoute'

import { routes as tripRoutes } from './trips'

export interface TripResponse {
    id: string
    title: string | null
    description: string | null
    createdAt: string
    updatedAt: string
}

export const routes: Hapi.ServerRoute[] = [
    rootRoute,
    ...tripRoutes
]
