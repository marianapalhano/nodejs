import { type ICreateUser } from "../../dtos/ICreateUser";
import { User } from "../../entities/User";
import { type IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        email,
        driver_license,
        password,
        id,
        avatar,
    }: ICreateUser): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            driver_license,
            password,
            id,
            avatar,
        });
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}

export { UsersRepositoryInMemory };
