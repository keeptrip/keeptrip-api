import { InputType, Field, ObjectType } from 'type-graphql'

import { Trip } from '@src/models/Trip'
import { PaginatedResponse } from '@src/utils/PaginatedResponse'

@InputType()
export class TripInput implements Partial<Trip> {
    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    description?: string

    @Field({ defaultValue: false })
    listed: boolean = false

    @Field({ nullable: true })
    password?: string
}

@ObjectType()
export class PaginatedTripsResponse extends PaginatedResponse(Trip) {}