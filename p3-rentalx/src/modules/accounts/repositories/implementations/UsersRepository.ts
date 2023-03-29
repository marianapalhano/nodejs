import { type Repository } from "typeorm";

import dataSource from "../../../../database/data-source";
import { type ICreateUser } from "../../dtos/ICreateUser";
import { User } from "../../entities/User";
import { type IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = dataSource.getRepository(User);
    }

    async create({
        name,
        email,
        driver_license,
        password,
        id,
        avatar,
    }: ICreateUser): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            id,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });
        return user;
    }
}

export { UsersRepository };
