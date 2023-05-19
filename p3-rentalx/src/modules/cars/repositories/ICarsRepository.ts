import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { type Car } from "../entities/Car";

interface ICarsRepository {
    create: (data: ICreateCarDTO) => Promise<Car>;
    findByLicensePlate: (license_plate: string) => Promise<Car>;
    findAvailableCars: (
        carmaker?: string,
        category_id?: string,
        name?: string
    ) => Promise<Car[]>;
    findById: (id: string) => Promise<Car>;
    updateAvailable: (id: string, is_available: boolean) => Promise<void>;
}

export type { ICarsRepository };
