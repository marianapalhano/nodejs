import { type Request, type Response } from "express";

import { type ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private readonly listCategoriesUsease: ListCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        const all = this.listCategoriesUsease.execute();
        return response.json(all);
    }
}

export { ListCategoriesController };
