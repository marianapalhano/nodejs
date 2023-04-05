import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
});
describe("Create Car", () => {
    it("should be able to create a car", async () => {
        await createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            daily_fee: 99,
            license_plate: "ABC1234",
            fine_amount: 99,
            carmaker: "Make of car",
            category_id: "1234",
        });
    });
});
