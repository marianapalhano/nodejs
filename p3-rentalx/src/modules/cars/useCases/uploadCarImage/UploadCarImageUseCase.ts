import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

interface IRequest {
    car_id: string;
    image_names: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarImageRepository")
        private readonly carImageRepository: ICarImageRepository,
        @inject("StorageProvider")
        private readonly storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, image_names }: IRequest): Promise<void> {
        image_names.map(async (image) => {
            await this.carImageRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImageUseCase };
