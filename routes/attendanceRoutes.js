import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteAttendance
} from "../controllers/attendanceController";
import { checkCoachRole } from "../helpers/auth_guards/authGuard";
import { filterAndPagination } from "../helpers/userHelper";
import {
  attendanceCreateValidationRules,
  attendanceUpdateValidationRules
} from "../validators/attendanceValidator";
import validate from "../validators/validateErrors";
import { authenticateToken } from "../helpers/userHelper";

const attendanceRoutes = app => {
  const router = Express.Router();

  router.post(
    "/",
    authenticateToken,
    checkCoachRole,
    attendanceCreateValidationRules(),
    validate,
    create
  );
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkCoachRole,
    attendanceUpdateValidationRules(),
    validate,
    update
  );
  router.delete("/:id", authenticateToken, checkCoachRole, deleteAttendance);

  app.use("/api/attendances", router);
};

export default attendanceRoutes;
