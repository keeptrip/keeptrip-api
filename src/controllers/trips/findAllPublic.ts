import Hapi from '@hapi/hapi'

import { Trip } from '@src/database/models/Trip'

export const route: Hapi.ServerRoute = {
    method: 'get',
    path: '/trips/public',
    async handler(req, h): Promise<object> {
        const { rows, count } = await Trip.findAndCountAll()

        return {
            total: count,
            items: rows.map((item: Trip): object => ({
                id: item.id,
                title: item.title,
                description: item.description,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }))
        }
    },
}
