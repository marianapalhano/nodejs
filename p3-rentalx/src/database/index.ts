import { type DataSource } from "typeorm";

import dataSource from "./data-source";

export async function createConnection(): Promise<DataSource> {
    return await dataSource.initialize();
}
