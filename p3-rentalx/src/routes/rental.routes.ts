/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/return/:id",
    ensureAuthenticated,
    returnRentalController.handle
);

rentalRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRoutes };
