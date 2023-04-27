import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    name: string;
    description: string;
    daily_fee: number;
    license_plate: string;
    fine_amount: number;
    carmaker: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        daily_fee,
        license_plate,
        fine_amount,
        carmaker,
        category_id,
    }: IRequest): Promise<void> {
        const carAlreadyExists =
            this.carsRepository.findByLicensePlate(license_plate);
        if (carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        await this.carsRepository.create({
            name,
            description,
            daily_fee,
            license_plate,
            fine_amount,
            carmaker,
            category_id,
        });
    }
}

export { CreateCarUseCase };
