import chai, { assert } from 'chai'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'
import config from 'config'

import { sequelize } from '@src/database'
import { Server } from '@src/Server'

import { truncateDatabase } from '@test/utils/database'

chai.use(sinonChai)

describe('Trips :: Get all', function (): void {
    const server = new Server(config.get('server.host'), Number(config.get('server.port')))
    
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

    describe('get', function (): void {
        beforeEach(async function (): Promise<void> {
            await sequelize.query(`
                INSERT INTO trips (title, description) VALUES
                    ('First trip', 'This is first item in the list'),
                    ('Second one without description', null),
                    (null, 'And the third item without title'),
                    (null, null);
            `)
        })

        it('should return list', function (): void {
            assert.equal(true, true)
        })
    })

    describe('getAll', function (): void {})

    describe('update', function (): void {})

    describe('destroy', function (): void {})
})