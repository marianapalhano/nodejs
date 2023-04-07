import dataSource from "database/data-source";
import { type Repository } from "typeorm";

import { CarImage } from "@modules/cars/entities/CarImage";

import { type ICarImageRepository } from "../ICarImageRepository";

class CarImageRepository implements ICarImageRepository {
    private readonly repository: Repository<CarImage>;

    constructor() {
        this.repository = dataSource.getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarImageRepository };
