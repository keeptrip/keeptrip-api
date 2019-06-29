import '@test'
import { assert } from 'chai'
import config from 'config'

import { createServer, prepareServer, stopServer } from '@test/utils/server'

describe('Trips routes', function (): void {
    const server = createServer()
    
    beforeEach(async function (): Promise<void> {
        await prepareServer(server)
    })
    
    afterEach(async function (): Promise<void> {
        await stopServer(server)
    })

    describe('Server', function (): void {
        it('should run on correct port', function (): void {
            assert.equal(server.hapi.info.port, config.get('server.port'))
        })
    })
})