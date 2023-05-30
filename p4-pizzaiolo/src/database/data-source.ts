import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE as any,
    logging: process.env.TYPEORM_LOGGING as any,
    entities: [],
    subscribers: [],
    migrations: [],
})