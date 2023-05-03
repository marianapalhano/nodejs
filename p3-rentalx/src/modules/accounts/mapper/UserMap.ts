import { classToClass } from "class-transformer";

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
        const user = classToClass({
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
