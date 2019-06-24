import chai, { assert } from 'chai'
import { stub } from 'sinon'
import sinonChai from 'sinon-chai'

import { Trip } from '../../../controllers/models/Trip'

chai.use(sinonChai)

describe('Trip model', function (): void {
    describe('create', function (): void {
        it('should create item with passed settings')
    })

    describe('findAll', function (): void {
        it('should return list of all items')
        it('should accept limit argument')
        it('should accept offset argument')
    })

    describe('findAllAvailable', function (): void {
        it('should return list of only available to user items')
        it('should accept limit argument')
        it('should accept offset argument')
    })

    describe('findOne', function (): void {
        it('should return item by id')
    })

    describe('findOneAvailable', function (): void {
        it('should return item by id only if available to user')
    })

    describe('update', function (): void {
        it('should update trip settings')
    })

    describe('remove', function (): void {
        it('should remove trip')
    })
})
