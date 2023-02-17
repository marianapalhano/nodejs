import { type Category } from "../models/Category";

interface ICategory {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName: (name: string) => Category | undefined;
    list: () => Category[];
    create: ({ name, description }: ICategory) => void;
}

export type { ICategoriesRepository, ICategory };