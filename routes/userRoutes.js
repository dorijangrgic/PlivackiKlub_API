import Express from "express";
import { register, activate, login } from "../controllers/userController";
import { authenticateToken, checkAdminRole } from "../helpers/userHelper";

const userRoutes = app => {
  const router = Express.Router();

  router.post("/register", authenticateToken, checkAdminRole, register);
  router.post("/activate/:id", activate);
  router.post("/login", login)

  app.use("/api/users", router);
};

export default userRoutes;
