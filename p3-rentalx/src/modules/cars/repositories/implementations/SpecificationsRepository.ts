import { getRepository, type Repository } from "typeorm";

import dataSource from "../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import {
    type ISpecification,
    type ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private readonly repository: Repository<Specification>;

    constructor() {
        this.repository = dataSource.getRepository(Specification);
    }

    async create({ name, description }: ISpecification): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });
        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOne({ where: { name } });
    }
}

export { SpecificationsRepository };
