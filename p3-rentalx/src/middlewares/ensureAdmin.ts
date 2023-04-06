/* eslint-disable @typescript-eslint/no-throw-literal */
import { type NextFunction, type Request, type Response } from "express";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAdmin(
    request: Request,
    _response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User must be an administrator");
    }
    next();
}
