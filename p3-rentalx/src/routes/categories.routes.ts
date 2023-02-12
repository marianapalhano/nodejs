import { Router } from "express";

const categoriesRoutes = Router();

interface ICategory {
    name: string;
    description: string;
}

const categories: ICategory[] = [];

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;
    categories.push({
        name,
        description,
    });
    response.status(201);
});

export { categoriesRoutes };
