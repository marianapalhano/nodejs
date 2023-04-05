// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { type IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { type ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CarsRepository } from "@modules/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { type ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
