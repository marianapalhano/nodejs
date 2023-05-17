import { type Specification } from "../entities/Specification";

interface ISpecification {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName: (name: string) => Promise<Specification>;
    list: () => Promise<Specification[]>;
    create: ({ name, description }: ISpecification) => Promise<Specification>;
    findByIds: (ids: string[]) => Promise<Specification[]>;
}

export type { ISpecificationsRepository, ISpecification };
