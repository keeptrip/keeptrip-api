import { Resolver, Query, Arg, Mutation } from 'type-graphql'

import { Trip } from '@src/models/Trip'

import { TripInput, PaginatedTripsResponse } from './TripTypes';

@Resolver(type => Trip)
export class TripResolver {

    // ########################## Get Item ##########################

    @Query(returns => Trip, { nullable: true })
    async trip(
        @Arg('id') id: string
    ): Promise<Trip | null> {
        return Trip.findByPk(id, {
            raw: true
        })
    }
    
    // ########################## Get Item List ##########################

    @Query(returns => PaginatedTripsResponse)
    async trips(
        @Arg('offset', { defaultValue: 0 }) offset: number,
        @Arg('limit', { defaultValue: 5 }) limit: number
    ): Promise<PaginatedTripsResponse> {
        const res = await Trip.findAndCountAll({
            limit,
            offset,
            raw: true
        })

        return {
            items: res.rows,
            total: res.count
        }
    }

    // ########################## Create Item ##########################

    @Mutation(returns => Trip)
    async addTrip(
        @Arg('data') data: TripInput
    ): Promise<Trip> {
        const res = await Trip.create({
            title: data.title,
            description: data.description,
            listed: data.listed,
            password: data.password
        })

        return res.get({ plain: true })
    }

    // ########################## Update Item ##########################

    @Mutation(returns => Trip, { nullable: true })
    async updateTrip(
        @Arg('id') id: string,
        @Arg('data') data: TripInput
    ): Promise<Trip | null> {
        const [affectedCount, affectedRows] = await Trip.update(data, {
            where: { id },
            limit: 1,
            returning: true
        })

        return affectedCount === 0
            ? null
            : affectedRows[0].get({ plain: true })
    }

    // ########################## Delete Item ##########################

    @Mutation(returns => Boolean)
    async deleteTrip(
        @Arg('id') id: string
    ): Promise<boolean> {
        const res = await Trip.destroy({
            where: { id },
            limit: 1
        })

        return res !== 0
    }
}