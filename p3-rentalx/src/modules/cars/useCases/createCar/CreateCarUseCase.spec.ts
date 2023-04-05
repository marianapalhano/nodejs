/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { AppError } from "@errors/AppError";
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

    it("should not be able to create a car with a license plate that is already registered", async () => {
        await createCarUseCase.execute({
            name: "Car1",
            description: "Car Description",
            daily_fee: 99,
            license_plate: "ABC1234",
            fine_amount: 60,
            carmaker: "Maker of car",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_fee: 99,
                license_plate: "ABC1234",
                fine_amount: 60,
                carmaker: "Maker of car",
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exists"));
    });

    it("should not be able to create a car with is_available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Car Description",
            daily_fee: 99,
            license_plate: "ABCD1234",
            fine_amount: 60,
            carmaker: "Maker of car",
            category_id: "category",
        });

        expect(car.is_available).toBe(true);
    });
});
