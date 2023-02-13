import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const categoriesRoutes = Router();

interface ICategory {
    name: string;
    description: string;
    id: string;
}

const categories: ICategory[] = [];

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;
    categories.push({
        name,
        description,
        id: uuidv4(),
    });
    response.status(201).send();
});

export { categoriesRoutes };
