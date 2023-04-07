import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private readonly carsImagesRepository: ICarsImagesRepository,
        @inject("StorageProvider")
        private readonly storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, image_name }: IRequest): Promise<void> {
        image_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImagesUseCase };
