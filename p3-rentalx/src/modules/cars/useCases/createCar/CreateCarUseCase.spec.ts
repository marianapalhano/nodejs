import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;

beforeEach(() => {
    createCarUseCase = new CreateCarUseCase();
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
