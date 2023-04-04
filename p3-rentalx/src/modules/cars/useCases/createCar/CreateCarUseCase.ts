import { injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_fee: number;
    license_plate: string;
    fine_amount: number;
    carmaker: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    async execute({
        name,
        description,
        daily_fee,
        license_plate,
        fine_amount,
        carmaker,
        category_id,
    }: IRequest): Promise<void> {}
}

export { CreateCarUseCase };
