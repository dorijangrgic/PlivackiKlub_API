import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteNotification
} from "../controllers/notifController";
import {
  checkCoachRole,
  checkCoachAndNotifAuthor
} from "../helpers/auth_guards/authGuard";
import { filterAndPagination } from "../helpers/userHelper";
import notifValidationRules from "../validators/notifValidator";
import validate from "../validators/validateErrors";
import { authenticateToken } from "../helpers/userHelper";

const notifRoutes = app => {
  const router = Express.Router();

  router.post(
    "/",
    authenticateToken,
    checkCoachRole,
    notifValidationRules(),
    validate,
    create
  );
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put(
    "/:id",
    authenticateToken,
    checkCoachAndNotifAuthor,
    notifValidationRules(),
    validate,
    update
  );
  router.delete(
    "/:id",
    authenticateToken,
    checkCoachAndNotifAuthor,
    deleteNotification
  );

  app.use("/api/notifications", router);
};

export default notifRoutes;
