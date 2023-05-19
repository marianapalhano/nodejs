import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { type Category } from "../entities/Category";

interface ICategoriesRepository {
    findByName: (name: string) => Promise<Category>;
    list: () => Promise<Category[]>;
    create: ({ name, description }: ICreateCategoryDTO) => Promise<void>;
}

export type { ICategoriesRepository };
