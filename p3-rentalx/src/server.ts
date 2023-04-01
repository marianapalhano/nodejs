/* eslint-disable import/no-extraneous-dependencies */
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { type DataSource } from "typeorm";

import { AppError } from "@errors/AppError";

import dataSource from "./database/data-source";
import { router } from "./routes";
import "@shared/container";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`,
        });
    }
);

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
