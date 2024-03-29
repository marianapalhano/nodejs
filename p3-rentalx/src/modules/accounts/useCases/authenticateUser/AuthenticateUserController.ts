import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );
        const authenticationData = await authenticateUserUseCase.execute({
            email,
            password,
        });
        return response.status(200).json(authenticationData);
    }
}

export { AuthenticateUserController };
