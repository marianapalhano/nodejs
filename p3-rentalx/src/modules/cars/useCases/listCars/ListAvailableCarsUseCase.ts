/* eslint-disable import/no-unresolved */
import { type Car } from "@modules/cars/entities/Car";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListAvailableCarsUseCase {
    constructor(private readonly carsRepository: ICarsRepository) {}
    async execute(): Promise<Car> {
        return await this.carsRepository.findAvailableCars();
    }
}

export { ListAvailableCarsUseCase };
