interface ICar {
    name: string;
    description: string;
    daily_fee: number;
    license_plate: string;
    fine_amount: number;
    carmaker: string;
    category_id: string;
}

interface ICarsRepository {
    create: (data: ICar) => Promise<void>;
}

export type { ICarsRepository, ICar };
