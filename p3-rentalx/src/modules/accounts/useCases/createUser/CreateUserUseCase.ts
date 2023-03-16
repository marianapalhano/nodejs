import { inject } from "tsyringe";

import { type ICreateUser } from "../../dtos/ICreateUser";
import { type IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        username,
        email,
        password,
        driver_license,
    }: ICreateUser): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            email,
            password,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
