import "reflect-metadata";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentalx",
    synchronize: false,
    logging: false,
    entities: [],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});

export async function createConnection(host = "database"): Promise<DataSource> {
    return await dataSource.setOptions({ host }).initialize();
}

export default dataSource;
