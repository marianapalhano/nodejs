import { type CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}
    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists != null) {
            throw new Error("Category already exists.");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
