import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { type DataSource } from "typeorm";

import dataSource from "./database/data-source";
import { router } from "./routes";
import "./shared/container";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => {
    console.log("server running");
});

async function createConnection(): Promise<DataSource> {
    return await dataSource.initialize();
}
createConnection()
    .then(() => {
        console.log("data source started");
    })
    .catch((err) => {
        console.log(err);
    });
