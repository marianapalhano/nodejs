// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/implementations/UsersTokensRepository";
import { type IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { type IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { type ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { type ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CarImageRepository } from "@modules/cars/repositories/implementations/CarImageRepository";
import { CarsRepository } from "@modules/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { type ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/repositories/implementations/RentalsRepository";
import { type IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

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

container.registerSingleton<ICarImageRepository>(
    "CarImageRepository",
    CarImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
