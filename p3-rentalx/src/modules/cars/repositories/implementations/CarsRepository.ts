import { type Repository } from "typeorm";

import { Car } from "@modules/cars/entities/Car";

import dataSource from "../../../../database/data-source";
import { type ICarsRepository, type ICreateCar } from "../ICarsRepository";

class CarsRepository implements ICarsRepository {
    private readonly repository: Repository<Car>;

    constructor() {
        this.repository = dataSource.getRepository(Car);
    }

    async create({
        name,
        description,
        license_plate,
        daily_fee,
        fine_amount,
        carmaker,
        category_id,
    }: ICreateCar): Promise<void> {
        const car = this.repository.create({
            name,
            description,
            license_plate,
            daily_fee,
            fine_amount,
            carmaker,
            category_id,
        });
        await this.repository.save(car);
    }
}

export { CarsRepository };
