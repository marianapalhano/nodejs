import { type Car } from "../entities/Car";
import { type Specification } from "../entities/Specification";

interface ICreateCar {
    id?: string;
    name: string;
    description: string;
    daily_fee: number;
    license_plate: string;
    fine_amount: number;
    carmaker: string;
    category_id: string;
    specifications?: Specification[];
}

interface ICarsRepository {
    create: (data: ICreateCar) => Promise<Car>;
    findByLicensePlate: (license_plate: string) => Promise<Car>;
    findAvailableCars: (
        carmaker?: string,
        category_id?: string,
        name?: string
    ) => Promise<Car[]>;
    findById: (id: string) => Promise<Car>;
    updateAvailable: (id: string, is_available: boolean) => Promise<void>;
}

export type { ICarsRepository, ICreateCar };
