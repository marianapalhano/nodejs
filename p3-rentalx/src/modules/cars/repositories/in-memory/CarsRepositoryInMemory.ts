import { type ICreateCar, type ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    async create(data: ICreateCar): Promise<void> {}
}

export { CarsRepositoryInMemory };
