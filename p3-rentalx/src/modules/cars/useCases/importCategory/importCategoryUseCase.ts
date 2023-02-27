import { parse } from "csv-parse";
import fs from "fs";

import { type ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
    name: string;
    description: string;
}
class ImportCategoryUseCase {
    constructor(private readonly categoriesRepository: ICategoriesRepository) {}

    async loadCategories(
        file: Express.Multer.File
    ): Promise<IImportCategories[]> {
        return await new Promise((resolve, reject) => {
            const categories: IImportCategories[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            stream.pipe(parseFile);
            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}

export { ImportCategoryUseCase };
