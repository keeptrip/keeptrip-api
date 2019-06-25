import chai, { assert } from 'chai'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'
import config from 'config'

import { sequelize } from '@src/database'
import { Server } from '@src/Server'

import { truncateDatabase } from '@test/utils/database'

chai.use(sinonChai)

describe('Trips :: Get by ID', function (): void {})