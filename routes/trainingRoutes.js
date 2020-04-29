import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteTraining
} from "../controllers/trainingController";
import { authenticateToken, filterAndPagination } from "../helpers/userHelper";
import { checkCoachRole } from "../helpers/auth_guards/authGuard";
import validate from "../validators/validateErrors";
import trainingValidationRules from "../validators/trainingValidator";

const trainingRoutes = app => {
  const router = Express.Router();

  router.post(
    "/",
    authenticateToken,
    checkCoachRole,
    trainingValidationRules(),
    validate,
    create
  );
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkCoachRole,
    trainingValidationRules(),
    validate,
    update
  );
  router.delete("/:id", authenticateToken, checkCoachRole, deleteTraining);

  app.use("/api/trainings", router);
};

export default trainingRoutes;
