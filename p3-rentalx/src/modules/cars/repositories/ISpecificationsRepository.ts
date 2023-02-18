import { type Specification } from "../models/Specification";

interface ISpecification {
    name: string;
    description: string;
}

interface ISpeficitationsRepository {
    findByName: (name: string) => Specification | undefined;
    list: () => Specification[];
    create: ({ name, description }: Specification) => void;
}

export type { ISpeficitationsRepository, ISpecification };
