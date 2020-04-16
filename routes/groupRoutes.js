import Express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteGroup
} from "../controllers/groupController";
import { authenticateToken, checkAdminRole } from "../helpers/userHelper";

const groupRoutes = app => {
  const router = Express.Router();

  router.post("/", authenticateToken, checkAdminRole, create);
  router.get("/", authenticateToken, checkAdminRole, findAll);
  router.get("/:id", authenticateToken, checkAdminRole, findOne);
  router.put("/:id", authenticateToken, checkAdminRole, update);
  router.delete("/:id", authenticateToken, checkAdminRole, deleteGroup);

  app.use("/api/groups", router);
};

export default groupRoutes;
