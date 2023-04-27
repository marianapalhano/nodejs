/* eslint-disable @typescript-eslint/no-throw-literal */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IReturn {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
        @inject("UsersTokensRepository")
        private readonly usersTokensRepository: IUsersTokensRepository
        @inject("DayjsDateProvider")
        private readonly dayjsDateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IReturn> {
        const user = await this.usersRepository.findByEmail(email);
        const { 
            secret_refresh_token, 
            secret_token, 
            expires_in_refresh_token, 
            expires_in_token, 
            expires_refresh_token_days } = auth;

        if (user == null) {
            throw new AppError("Incorrect email or password");
        }

        const paswordMatches = await compare(password, user.password);
        if (!paswordMatches) {
            throw new AppError("Incorrect email or password");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        })

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token
        };
    }
}

export { AuthenticateUserUseCase };
