import { Sequelize } from "sequelize-typescript";

export const truncateDatabase = async (sequelize: Sequelize) => {
    const tables: string[] = [
        'trips'
    ]

    const stringTables: string = tables.join(', ')
    
    return sequelize.query(`TRUNCATE ${stringTables};`)
}