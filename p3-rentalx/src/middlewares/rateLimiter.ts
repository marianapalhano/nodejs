import { AppError } from "@errors/AppError";
import { type NextFunction, type Request, type Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        }
    });

    const limiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: "rateLimiter",
        points: 5,
        duration: 5,
    });
    try {
        await limiter.consume(request.ip);

        next();
        return;
    } catch (err) {
        throw new AppError("Too many requests", 429);
    }
}
