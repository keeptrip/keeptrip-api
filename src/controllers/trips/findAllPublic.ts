import Hapi from '@hapi/hapi'
import Joi from '@hapi/joi'

import { Trip } from '@src/database/models/Trip.model'
import { TripResponse } from '..';

export interface TripFindALlPublicResponse {
    total: number
    items: TripResponse[]
}

export const route: Hapi.ServerRoute = {
    method: 'get',
    path: '/trips/public',
    options: {
        validate: {
            query: {
                limit: Joi.number().min(0).default(5).optional(),
                offset: Joi.number().min(0).default(0).optional()
            }
        }
    },
    async handler(req, h): Promise<object> {
        const { rows, count } = await Trip.findAndCountAll({
            raw: true
        })

        return {
            total: count,
            items: rows.map((item: Trip): TripResponse => ({
                id: item.id,
                title: item.title,
                description: item.description,
                createdAt: item.created_at.toISOString(),
                updatedAt: item.updated_at.toISOString()
            }))
        }
    },
}
