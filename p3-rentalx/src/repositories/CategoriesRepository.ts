import { Category } from "../models/Category";

interface ICategory {
    name: string;
    description: string;
}

class CategoriesRepository {
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
}

export { CategoriesRepository };
