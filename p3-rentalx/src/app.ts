/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";

import { router } from "./routes";
import "@shared/container";
import swaggerFile from "./swagger.json";

import upload from "@config/upload";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

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

export { app };
