/* eslint-disable @typescript-eslint/no-throw-literal */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IReturn> {
        const user = await this.usersRepository.findByEmail(email);
        if (user == null) {
            throw new AppError("Incorrect email or password");
        }

        const paswordMatches = await compare(password, user.password);
        if (!paswordMatches) {
            throw new AppError("Incorrect email or password");
        }

        const token = sign({}, "c7025305a85ddae9c5fd1a8cd9168f89", {
            subject: user.id,
            expiresIn: "1d",
        });

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}

export { AuthenticateUserUseCase };
