import Express from "express";
import { register, activate, login } from "../controllers/userController";
import { checkAdminRole } from "../helpers/auth_guards/authGuard";
import validate from "../validators/validateErrors";
import {
  userActivateValidationRules,
  userRegisterValidationRules,
  userLoginValidationRules
} from "../validators/userValidator";
import { authenticateToken } from "../helpers/userHelper";

const userRoutes = app => {
  const router = Express.Router();

  router.post(
    "/register",
    authenticateToken,
    checkAdminRole,
    userRegisterValidationRules(),
    validate,
    register
  );
  router.post(
    "/activate/:id",
    userActivateValidationRules(),
    validate,
    activate
  );
  router.post("/login", userLoginValidationRules(), validate, login);

  app.use("/api/users", router);
};

export default userRoutes;
