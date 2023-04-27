/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to a nonexistent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exist"));
    });

    it("should be able to add a new specification to a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name",
            description: "Description",
            daily_fee: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            carmaker: "Make",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
