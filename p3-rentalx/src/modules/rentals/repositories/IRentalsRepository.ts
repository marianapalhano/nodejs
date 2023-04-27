import { type Rental } from "../entities/Rental";

interface ICreateRental {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
    id?: string;
    end_date?: Date;
    total?: number;
}

interface IRentalsRepository {
    findOpenRentalByCar: (car_id: string) => Promise<Rental>;
    findOpenRentalByUser: (user_id: string) => Promise<Rental>;
    create: (data: ICreateRental) => Promise<Rental>;
    findById: (id: string) => Promise<Rental>;
    findByUser: (user_id: string) => Promise<Rental[]>;
}

export type { IRentalsRepository, ICreateRental };
