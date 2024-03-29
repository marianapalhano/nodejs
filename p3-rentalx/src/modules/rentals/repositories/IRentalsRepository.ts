import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { type Rental } from "../entities/Rental";

interface IRentalsRepository {
    findOpenRentalByCar: (car_id: string) => Promise<Rental>;
    findOpenRentalByUser: (user_id: string) => Promise<Rental>;
    create: (data: ICreateRentalDTO) => Promise<Rental>;
    findById: (id: string) => Promise<Rental>;
    findByUser: (user_id: string) => Promise<Rental[]>;
}

export type { IRentalsRepository };
