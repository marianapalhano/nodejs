import { Category } from "../models/Category";
import {
    type ICategoriesRepository,
    type ICategory,
} from "./ICategoriesRepository";
class CategoriesRepository implements ICategoriesRepository {
    private readonly categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICategory): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });
        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category | undefined {
        return this.categories.find((category) => category.name === name);
    }
}

export { CategoriesRepository };
