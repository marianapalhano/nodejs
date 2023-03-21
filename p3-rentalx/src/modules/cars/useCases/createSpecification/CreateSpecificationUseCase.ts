/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { type ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private readonly SpecificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const SpecificationAlreadyExists =
            await this.SpecificationsRepository.findByName(name);

        if (SpecificationAlreadyExists != null) {
            throw new AppError("Specification already exists.");
        }
        await this.SpecificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
