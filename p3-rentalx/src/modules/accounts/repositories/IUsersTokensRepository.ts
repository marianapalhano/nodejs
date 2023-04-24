import { type UsersTokens } from "../entities/UsersTokens";

interface ICreateUsersTokens {
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

interface IUsersTokensRepository {
    create: ({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokens) => Promise<UsersTokens>;

    findByUserIdAndRefreshToken: (
        user_id: string,
        refresh_token: string
    ) => Promise<UsersTokens>;

    deleteById: (id: string) => Promise<void>;

    findByRefreshToken: (refresh_token: string) => Promise<UsersTokens>;
}

export type { IUsersTokensRepository, ICreateUsersTokens };
