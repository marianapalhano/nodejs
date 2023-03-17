import { type ICreateUser } from "../dtos/ICreateUser";
import { type User } from "../entities/User";

interface IUsersRepository {
    create: (data: ICreateUser) => Promise<void>;
    findByEmail: (email: string) => Promise<User | null>;
}

export type { IUsersRepository };
