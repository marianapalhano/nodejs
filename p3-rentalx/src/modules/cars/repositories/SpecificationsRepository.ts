import { Specification } from "../models/Specification";
import {
    type ISpecification,
    type ISpeficitationsRepository,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpeficitationsRepository {
    private readonly specifications: Specification[];
    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ISpecification): void {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }

    list(): Specification[] {
        return this.specifications;
    }

    findByName(name: string): Specification | undefined {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }
}

export { SpecificationsRepository };
