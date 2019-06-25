import {
    Table, Column, Model, DataType, CreatedAt, UpdatedAt,
} from 'sequelize-typescript'

@Table({
    tableName: 'trips',
    underscored: true
})
export class Trip extends Model<Trip> {
    @Column(DataType.STRING)
    public title!: string | null

    @Column(DataType.TEXT)
    public description!: string | null

    @CreatedAt
    public created_at!: string

    @UpdatedAt
    public updated_at!: string
}
