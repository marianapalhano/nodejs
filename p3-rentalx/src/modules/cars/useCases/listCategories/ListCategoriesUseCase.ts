import { type Category } from "../../models/Category";
import { type ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private readonly categoriesRepository: ICategoriesRepository) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase };
