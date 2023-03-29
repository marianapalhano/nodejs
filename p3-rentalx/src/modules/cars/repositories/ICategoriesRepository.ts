import { type Category } from "../entities/Category";

interface ICategory {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName: (name: string) => Promise<Category>;
    list: () => Promise<Category[]>;
    create: ({ name, description }: ICategory) => Promise<void>;
}

export type { ICategoriesRepository, ICategory };
