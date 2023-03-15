import { type ICreateUser } from "../dtos/ICreateUser";

interface IUsersRepository {
    create: (data: ICreateUser) => Promise<void>;
}

export type { IUsersRepository };
