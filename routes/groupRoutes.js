import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteGroup
} from "../controllers/groupController";
import { filterAndPagination } from "../helpers/userHelper";
import { checkAdminRole } from "../helpers/auth_guards/authGuard";
import {
  groupCreateValidationRules,
  groupUpdateValidationRules
} from "../validators/groupValidator";
import validate from "../validators/validateErrors";
import { authenticateToken } from "../helpers/userHelper";

const groupRoutes = app => {
  const router = Express.Router();

  router.post(
    "/",
    authenticateToken,
    checkAdminRole,
    groupCreateValidationRules(),
    validate,
    create
  );
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkAdminRole,
    groupUpdateValidationRules(),
    validate,
    update
  );
  router.delete("/:id", authenticateToken, checkAdminRole, deleteGroup);

  app.use("/api/groups", router);
};

export default groupRoutes;
