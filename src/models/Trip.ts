import nanoid from 'nanoid'
import { ObjectType, Field, ID } from 'type-graphql'
import { Table, Unique, PrimaryKey, Column, DataType, AllowNull, Default, CreatedAt, UpdatedAt, Model } from 'sequelize-typescript'

@ObjectType()
@Table({
    tableName: 'trips',
    underscored: true
})
export class Trip extends Model<Trip> {
    @Unique
    @PrimaryKey
    @Default(() => nanoid(10))
    @Column(DataType.STRING({ length: 50 }))
    @Field(type => ID)
    id: string

    @AllowNull
    @Column(DataType.STRING({ length: 255 }))
    @Field(type => String, { nullable: true })
    title: string | null

    @AllowNull
    @Column(DataType.TEXT)
    @Field(type => String, { nullable: true })
    description: string | null

    @Default(false)
    @Column(DataType.BOOLEAN)
    listed: boolean

    @AllowNull
    @Column(DataType.STRING)
    password: string | null

    @CreatedAt
    @Column({ field: 'created_at' })
    @Field()
    createdAt: Date

    @UpdatedAt
    @Column({ field: 'updated_at' })
    @Field()
    updatedAt: Date
}