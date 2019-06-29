import '@test'
import { assert } from 'chai'

import { sequelize } from '@src/database'

import { truncateDatabase } from '@test/utils/database'
import { createServer, prepareServer, stopServer } from '@test/utils/server'

describe('Trips routes', function (): void {
    const server = createServer()
    
    beforeEach(async function (): Promise<void> {
        await prepareServer(server)
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
        required: ['item'],
        properties: {
            item: tripItemSchema
        }
    }

    // ########################################### ###########################################

    describe('[POST] /trips (create)', function (): void {
        it('should create item without any info')

        it('should create item with title, description, listed options')
        
        it('should create item with password')
    })
})