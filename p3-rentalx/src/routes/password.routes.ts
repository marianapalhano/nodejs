/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/resetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
