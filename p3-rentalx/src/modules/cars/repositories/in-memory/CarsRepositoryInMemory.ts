import { Car } from "@modules/cars/entities/Car";

import { type ICreateCar, type ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        license_plate,
        daily_fee,
        fine_amount,
        carmaker,
        category_id,
    }: ICreateCar): Promise<void> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            license_plate,
            daily_fee,
            fine_amount,
            carmaker,
            category_id,
        });
        this.cars.push(car);
    }
}

export { CarsRepositoryInMemory };
