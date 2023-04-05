import { type Car } from "../entities/Car";

interface ICreateCar {
    name: string;
    description: string;
    daily_fee: number;
    license_plate: string;
    fine_amount: number;
    carmaker: string;
    category_id: string;
}

interface ICarsRepository {
    create: (data: ICreateCar) => Promise<void>;
    findByLicensePlate: (lincense_plate: string) => Promise<Car>;
}

export type { ICarsRepository, ICreateCar };
