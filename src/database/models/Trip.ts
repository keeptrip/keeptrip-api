import {
    Table, Column, Model, DataType,
} from 'sequelize-typescript'

@Table({ underscored: true })
export class Trip extends Model<Trip> {
    @Column(DataType.STRING)
    private title!: string
}
