import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

/*
Generate JWT access token
*/
const generateToken = (username, userRole) => {
  const payload = {
    username: username,
    roleId: userRole
  };
  return jwt.sign(payload, process.env.jwt_secret_key, { expiresIn: "1800s" });
};

/*
JWT Authentication middleware
*/
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user; // payload
    next();
  });
};

/* 
Check password and generate token
*/
const comparePassword = (password, userData) => {
  if (bcrypt.compareSync(password, userData.password))
    return generateToken(userData.username, userData.roleId);
  else return "";
};


const checkAdminRole = (req, res, next) => {
  console.log(req.user);
  if (req.user.roleId === 1) next();
  else return res.sendStatus(403);
};

const checkCoachRole = (req, res, next) => {
  if (req.user.roleId === 2) next();
  else return res.sendStatus(403);
};

const checkSwimmerRole = (req, res, next) => {
  if (req.user.roleId === 3) next();
  else return res.sendStatus(403);
};


export {
  generateToken,
  authenticateToken,
  comparePassword,
  checkAdminRole,
  checkCoachRole,
  checkSwimmerRole
};
