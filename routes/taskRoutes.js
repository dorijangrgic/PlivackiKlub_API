import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteTask
} from "../controllers/taskController";
import { checkCoachRole } from "../helpers/auth_guards/authGuard";
import { authenticateToken, filterAndPagination } from "../helpers/userHelper";
import taskValidationRules from "../validators/taskValidator";
import validate from "../validators/validateErrors";

const taskRoutes = app => {
  const router = Express.Router();

  router.post(
    "/",
    authenticateToken,
    checkCoachRole,
    taskValidationRules(),
    validate,
    create
  );
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkCoachRole,
    taskValidationRules(),
    validate,
    update
  );
  router.delete("/:id", authenticateToken, checkCoachRole, deleteTask);

  app.use("/api/tasks", router);
};

export default taskRoutes;
