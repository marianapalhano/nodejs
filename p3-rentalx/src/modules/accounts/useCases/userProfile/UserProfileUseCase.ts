import { inject, injectable } from "tsyringe";

import { type IUserResponse } from "@modules/accounts/dtos/IUserResponse";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UserProfileUseCase {
    constructor(
        @inject("UsersRepository")
        private readonly usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUserResponse> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export { UserProfileUseCase };
