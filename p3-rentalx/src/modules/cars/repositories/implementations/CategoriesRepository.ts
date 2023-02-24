import { Category } from "../../models/Category";
import {
    type ICategoriesRepository,
    type ICategory,
} from "../ICategoriesRepository";
class CategoriesRepository implements ICategoriesRepository {
    private readonly categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
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
