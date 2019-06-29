import '@test'
import { assert } from 'chai'
import _ from 'lodash'
import nanoid from 'nanoid'
import moment from 'moment'
import qs from 'qs'

import { sequelize } from '@src/database'

import { truncateDatabase } from '@test/utils/database'
import { createServer, prepareServer, stopServer } from '@test/utils/server'

import { TripFindALlPublicResponse } from '@src/controllers/trips/findAllPublic';

interface TableRow {
    id: string,
    title: string | null,
    description: string | null,
    listed: boolean,
    password: string | null
}

describe('Trips routes', function (): void {
    const server = createServer()

    const tableRows: TableRow[] = [
        { id: nanoid(), title: 'TITLE', description: null, listed: false, password: 'PASSWORD' },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: false, password: null },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: true, password: 'PASSWORD' },
        { id: nanoid(), title: null, description: null, listed: true, password: null },
        { id: nanoid(), title: 'TITLE', description: 'DESCRIPTION', listed: true, password: 'PASSWORD' },
        { id: nanoid(), title: 'TITLE', description: 'DESCRIPTION', listed: false, password: 'PASSWORD' },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: false, password: null },
        { id: nanoid(), title: null, description: null, listed: true, password: null },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: true, password: null },
        { id: nanoid(), title: 'TITLE', description: 'DESCRIPTION', listed: true, password: 'PASSWORD' },
        { id: nanoid(), title: 'TITLE', description: 'DESCRIPTION', listed: false, password: null },
        { id: nanoid(), title: 'TITLE', description: null, listed: false, password: 'PASSWORD' },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: false, password: 'PASSWORD' },
        { id: nanoid(), title: 'TITLE', description: 'DESCRIPTION', listed: false, password: null },
        { id: nanoid(), title: null, description: 'DESCRIPTION', listed: true, password: null },
    ]
    const tableRowsSql: string = tableRows
        .map((item, index) => `(
            '${item.id}',
            ${item.title ? `'${item.title}'` : 'null'},
            ${item.description ? `'${item.description}'` : 'null'},
            ${item.listed},
            ${item.password ? `'${item.password}'` : 'null'},
            '${moment().subtract(index, 'days').toISOString()}',
            '${moment().subtract(index, 'hours').toISOString()}'
        )`)
        .join(',')
    
    beforeEach(async function (): Promise<void> {
        await Promise.all([
            prepareServer(server),
            sequelize.query(`INSERT INTO trips (id, title, description, listed, password, created_at, updated_at) VALUES ${tableRowsSql};`)
        ])
    })
    
    afterEach(async function (): Promise<void> {
        await Promise.all([
            stopServer(server),
            truncateDatabase(sequelize)
        ])
    })

    const tripItemSchema = {
        type: 'object',
        required: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
        properties: {
            id: {
                type: 'string'
            },
            title: {
                type: ['string', 'null'],
                maxLength: 255
            },
            description: {
                type: ['string', 'null']
            },
            createdAt: {
                format: 'date-time'
            },
            updatedAt: {
                format: 'date-time'
            }
        }
    }

    const baseSchema = {
        type: 'object',
        required: ['total', 'items'],
        properties: {
            total: {
                type: 'integer',
                minimum: 0
            },
            items: {
                type: 'array',
                items: tripItemSchema
            }
        }
    }

    // ########################################### ###########################################
    
    describe('[GET] /trips/public (findAllPublic)', function (): void {
        it('should return only listed and passwordless items', async function (): Promise<void> {
            const res = await server.hapi.inject({
                method: 'get',
                url: '/trips/public'
            })
            const result = res.result as TripFindALlPublicResponse

            assert.equal(res.statusCode, 200)
            assert.jsonSchema(result, baseSchema)
            assert.sameMembers(
                result.items.map((item): string => item.id),
                _(tableRows)
                    .filter((item): boolean => item.listed && !item.password)
                    .map((item): string => item.id)
                    .slice(0, 5)
                    .value()
            )
        })

        it('should return empty list', async function (): Promise<void> {
            await truncateDatabase(sequelize)

            const res = await server.hapi.inject({
                method: 'get',
                url: '/trips/public'
            })
            const result = res.result as TripFindALlPublicResponse

            assert.equal(res.statusCode, 200)
            assert.jsonSchema(result, baseSchema)

            assert.equal(result.total, 0)
            assert.lengthOf(result.items, 0)
        })

        // it('should return new items on the top', async function (): Promise<void> {
        //     const res = await server.hapi.inject({
        //         method: 'get',
        //         url: '/trips/public'
        //     })
        //     const result = res.result as TripFindALlPublicResponse

        //     assert.equal(res.statusCode, 200)
        //     assert.jsonSchema(res.result, baseSchema)
        //     assert.sameMembers(
        //         result.items.map((item): string => item.id),
        //         tableRows.map((item): string => item.id)
        //     )
        // })

        it('should be able to offset', async function (): Promise<void> {
            const query = qs.stringify({
                offset: 5
            })
            const res = await server.hapi.inject({
                method: 'get',
                url: `/trips/public?${query}`,
                
            })
            const result = res.result as TripFindALlPublicResponse

            assert.equal(res.statusCode, 200)
            assert.jsonSchema(result, baseSchema)
            assert.sameMembers(
                result.items.map((item): string => item.id),
                _(tableRows)
                    .filter((item): boolean => item.listed && !item.password)
                    .map((item): string => item.id)
                    .slice(5, 10)
                    .value()
            )
        })

        it('should be able to limit', async function (): Promise<void> {
            const query = qs.stringify({
                limit: 3
            })
            const res = await server.hapi.inject({
                method: 'get',
                url: `/trips/public?${query}`,
                
            })
            const result = res.result as TripFindALlPublicResponse

            assert.equal(res.statusCode, 200)
            assert.jsonSchema(result, baseSchema)
            assert.sameMembers(
                result.items.map((item): string => item.id),
                _(tableRows)
                    .filter((item): boolean => item.listed && !item.password)
                    .map((item): string => item.id)
                    .slice(0, 3)
                    .value()
            )
        })
    })
})