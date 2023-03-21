/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Missing token");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "c7025305a85ddae9c5fd1a8cd9168f89"
        ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        next();
    } catch {
        throw new Error("Invalid token");
    }
}
