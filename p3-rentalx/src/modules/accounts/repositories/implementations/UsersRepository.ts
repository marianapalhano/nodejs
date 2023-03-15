import { getRepository, type Repository } from "typeorm";

import { type ICreateUser } from "../../dtos/ICreateUser";
import { User } from "../../entities/User";
import { type IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        username,
        email,
        driver_license,
        password,
    }: ICreateUser): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            driver_license,
            password,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
