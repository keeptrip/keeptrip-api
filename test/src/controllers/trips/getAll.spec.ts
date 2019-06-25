import chai, { assert } from 'chai'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'
import jsonChai from 'chai-json-schema'
import config from 'config'

import { sequelize } from '@src/database'
import { routes } from '@src/controllers'
import { Server } from '@src/Server'

import { truncateDatabase } from '@test/utils/database'
import { ServerInjectResponse } from '@hapi/hapi';

chai.use(sinonChai)
chai.use(jsonChai)

describe('Trips routes', function (): void {
    const server = new Server(config.get('server.host'), Number(config.get('server.port')))
    server.routes = routes
    
    beforeEach(async function (): Promise<void> {
        await server.prepare()
    })
    
    afterEach(async function (): Promise<void> {
        await Promise.all([
            server.stop(),
            truncateDatabase(sequelize)
        ])
    })

    // ########################################### ###########################################

    describe('create', function (): void {})

    // ########################################### ###########################################
    
    describe('[GET] /trips', function (): void {
        beforeEach(async function (): Promise<void> {
            await sequelize.query(`
                INSERT INTO trips (title, description) VALUES
                    ('First trip', 'This is first item in the list'),
                    ('Second one without description', null),
                    (null, 'And the third item without title'),
                    (null, null);
            `)
        })

        const schema = {
            type: 'object',
            required: ['total', 'items'],
            properties: {
                total: {
                    type: 'integer',
                    minimum: 0
                },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
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
                }
            }
        }

        it('should return list', async function (): Promise<void> {
            const res = await server.hapi.inject({
                method: 'get',
                url: '/trips'
            })

            assert.jsonSchema(res.result, schema)
        })
    })

    // ########################################### ###########################################

    describe('getAll', function (): void {})

    // ########################################### ###########################################

    describe('update', function (): void {})

    // ########################################### ###########################################

    describe('destroy', function (): void {})
})