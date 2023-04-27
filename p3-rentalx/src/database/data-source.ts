import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/entities/User";
import { Category } from "@modules/cars/entities/Category";
import { Specification } from "@modules/cars/entities/Specification";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentalx",
    synchronize: false,
    logging: false,
    entities: [Category, Specification, User],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
});

export default dataSource;
