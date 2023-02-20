import { type Specification } from "../models/Specification";

interface ISpecification {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName: (name: string) => Specification | undefined;
    list: () => Specification[];
    create: ({ name, description }: ISpecification) => void;
}

export type { ISpecificationsRepository, ISpecification };
