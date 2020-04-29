import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteClub
} from "../controllers/clubController";
import { checkAdminRole } from "../helpers/auth_guards/authGuard";
import { authenticateToken, filterAndPagination } from "../helpers/userHelper";
import clubValidationRules from "../validators/clubValidator";
import validate from "../validators/validateErrors";

const clubRoutes = app => {
  const router = Express.Router();

  router.post("/", authenticateToken, checkAdminRole, clubValidationRules(), validate, create);
  router.get("/", authenticateToken, filterAndPagination, findAll);
  router.get("/:id", authenticateToken, findOne);
  router.put("/:id", authenticateToken, checkAdminRole, clubValidationRules(), validate, update);
  router.delete("/:id", authenticateToken, checkAdminRole, deleteClub);

  app.use("/api/clubs", router);
};

export default clubRoutes;
