import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { AppError } from "@errors/AppError";

import { router } from "./routes";
import "@shared/container";
import swaggerFile from "./swagger.json";

import upload from "@config/upload";
import rateLimiter from "middlewares/rateLimiter";

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use(cors());
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
