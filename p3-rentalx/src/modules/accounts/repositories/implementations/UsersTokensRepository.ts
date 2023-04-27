import dataSource from "database/data-source";
import { getRepository, type Repository } from "typeorm";

import { type ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { type IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private readonly repository: Repository<UsersTokens>;

    constructor() {
        this.repository = dataSource.getRepository(UsersTokens);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UsersTokens> {
        const usersTokens = await this.repository.findOne({
            where: { user_id, refresh_token },
        });
        return usersTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
        const userToken = await this.repository.findOne({
            where: { refresh_token },
        });

        return userToken;
    }
}

export { UsersTokensRepository };
