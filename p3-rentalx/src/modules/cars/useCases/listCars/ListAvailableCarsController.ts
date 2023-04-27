import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, carmaker, category_id } = request.query;
        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );
        const cars = await listAvailableCarsUseCase.execute({
            name: name as string,
            carmaker: carmaker as string,
            category_id: category_id as string,
        });

        return response.status(200).json(cars);
    }
}

export { ListAvailableCarsController };
