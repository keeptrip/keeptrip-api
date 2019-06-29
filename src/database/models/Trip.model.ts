import {
    Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default, AllowNull, Unique, PrimaryKey,
} from 'sequelize-typescript'

@Table({
    tableName: 'trips',
    underscored: true
})
export class Trip extends Model<Trip> {
    @Unique
    @PrimaryKey
    @Column(DataType.STRING({
        length: 50
    }))
    public id!: string

    @AllowNull
    @Column(DataType.STRING({
        length: 255
    }))
    public title!: string | null

    @AllowNull
    @Column(DataType.TEXT)
    public description!: string | null

    @Default(false)
    @Column(DataType.BOOLEAN)
    public listed!: boolean

    @AllowNull
    @Column(DataType.STRING)
    public password!: string | null

    @CreatedAt
    public created_at!: Date

    @UpdatedAt
    public updated_at!: Date
}
