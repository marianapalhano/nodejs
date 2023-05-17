import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            license_plate,
            daily_fee,
            fine_amount,
            carmaker,
            category_id,
        } = request.body;
        const createCarUseCase = container.resolve(CreateCarUseCase);
        const car = await createCarUseCase.execute({
            name,
            description,
            license_plate,
            daily_fee,
            fine_amount,
            carmaker,
            category_id,
        });
        return response.status(201).json(car);
    }
}

export { CreateCarController };
