import { Specification } from "../entities/Specification";

interface ICreateCarDTO {
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

export { ICreateCarDTO }