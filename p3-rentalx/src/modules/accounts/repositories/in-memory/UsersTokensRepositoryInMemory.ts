/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UsersTokens } from "@modules/accounts/entities/UsersTokens";

import {
    type ICreateUsersTokens,
    type IUsersTokensRepository,
} from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UsersTokens[] = [];

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokens): Promise<UsersTokens> {
        const userToken = new UsersTokens();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UsersTokens> {
        const userToken = this.usersTokens.find(
            (ut) => ut.user_id === user_id && ut.refresh_token && refresh_token
        );
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((ut) => ut.id === id);
        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
        const userToken = this.usersTokens.find(
            (ut) => ut.refresh_token === refresh_token
        );
        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
