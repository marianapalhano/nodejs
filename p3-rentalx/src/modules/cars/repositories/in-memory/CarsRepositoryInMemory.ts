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
    }: ICreateCar): Promise<Car> {
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
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailableCars(
        carmaker?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        return this.cars.filter(
            (car) =>
                car.is_available ||
                (carmaker && car.carmaker === carmaker) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
        );
    }

    findById: (id: string) => Promise<Car>;

    updateAvailable: (id: string, is_available: boolean) => Promise<void>;
}

export { CarsRepositoryInMemory };
