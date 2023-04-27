import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./resetPasswordUseCase";

class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;
        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

        await resetPasswordUseCase.execute({ token: String(token), password });

        return response.send();
    }
}

export { ResetPasswordController };
