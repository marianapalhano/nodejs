/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/no-unresolved */
import { inject, injectable } from "tsyringe";

import { type Car } from "@modules/cars/entities/Car";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    name?: string;
    carmaker?: string;
    category_id?: string;
}
@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({ name, carmaker, category_id }: IRequest): Promise<Car[]> {
        return await this.carsRepository.findAvailableCars({
            name,
            carmaker,
            category_id,
        });
    }
}

export { ListAvailableCarsUseCase };
