/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }

    async findAvailableCars(
        carmaker?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("cars")
            .where("is_available = :is_available", { is_available: true });

        if (carmaker) {
            carsQuery.where("cars.carmaker = :carmaker", { carmaker });
        }

        if (name) {
            carsQuery.where("cars.name = :name", { name });
        }

        if (category_id) {
            carsQuery.where("cars.category_id = :category_id", { category_id });
        }

        return await carsQuery.getMany();
    }
}

export { CarsRepository };
