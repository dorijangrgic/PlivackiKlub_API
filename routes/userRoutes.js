import Express from "express";
import {
  register,
  activate,
  login,
  findAll,
  findOne,
  update,
  deleteUser
} from "../controllers/userController";
import { checkAdminRole } from "../helpers/auth_guards/authGuard";
import validate from "../validators/validateErrors";
import {
  userActivateValidationRules,
  userRegisterValidationRules,
  userLoginValidationRules,
  userUpdateValidationRules
} from "../validators/userValidator";
import { authenticateToken, filterAndPagination } from "../helpers/userHelper";

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
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkAdminRole,
    userUpdateValidationRules(),
    validate,
    update
  );
  router.delete("/:id", authenticateToken, checkAdminRole, deleteUser);

  app.use("/api/users", router);
};

export default userRoutes;
