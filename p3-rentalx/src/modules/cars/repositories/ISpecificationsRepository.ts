import { type Specification } from "../entities/Specification";

interface ISpecification {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName: (name: string) => Promise<Specification>;
    list: () => Promise<Specification[]>;
    create: ({ name, description }: ISpecification) => Promise<void>;
}

export type { ISpecificationsRepository, ISpecification };
