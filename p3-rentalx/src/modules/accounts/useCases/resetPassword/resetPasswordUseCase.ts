/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private readonly usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private readonly dateProvider: IDateProvider,
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Invalid token");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Expired token");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase };
