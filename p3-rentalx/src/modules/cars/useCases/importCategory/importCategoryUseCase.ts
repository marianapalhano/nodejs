/* eslint-disable import/no-extraneous-dependencies */
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { type ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private readonly categoriesRepository: ICategoriesRepository
    ) {}

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
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const categoryAlreadyExists =
                this.categoriesRepository.findByName(name);
            if (categoryAlreadyExists == null) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
