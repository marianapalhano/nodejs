import { type CarImage } from "../entities/CarImage";

interface ICarImageRepository {
    create: (car_id: string, image_name: string) => Promise<CarImage>;
}

export type { ICarImageRepository };
