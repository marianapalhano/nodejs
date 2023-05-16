import { instanceToInstance } from "class-transformer";

import { type IUserResponse } from "../dtos/IUserResponse";
import { type User } from "../entities/User";

class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponse {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });
        return user;
    }
}

export { UserMap };
