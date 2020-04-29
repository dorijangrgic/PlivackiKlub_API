import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import db from "../models";

dotenv.config();

/*
Generate JWT access token
*/
const generateToken = userData => {
  const payload = {
    id: userData.id,
    username: userData.username,
    roleId: userData.roleId
  };
  return jwt.sign(payload, process.env.jwt_secret_key, { expiresIn: "3600s" });
};

/*
JWT Authentication middleware
*/
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err) return res.status(403).send({ message: err.message });
    req.user = user; // payload
    next();
  });
};

/* 
Check password and generate token (rename method)
*/
const comparePassword = (password, userData) => {
  if (bcrypt.compareSync(password, userData.password))
    return generateToken(userData);
  else return "";
};

/*
Filter and pagination middleware
*/
const filterAndPagination = (req, res, next) => {
  const Op = db.Sequelize.Op;
  const filterAndPaginationObject = {};

  // limit and offset
  if (req.query.limit)
    filterAndPaginationObject["limit"] = parseInt(req.query.limit);
  if (req.query.offset)
    filterAndPaginationObject["offset"] = parseInt(req.query.offset);

  // order attribute and direction
  if (req.query.orderBy && req.query.orderDirection)
    filterAndPaginationObject["order"] = [
      [req.query.orderBy, req.query.orderDirection]
    ];

  // filter attribute and value
  if (req.query.searchValue && req.query.searchAttribute)
    filterAndPaginationObject["where"] = {
      [req.query.searchAttribute]: {
        [Op.like]: `%${req.query.searchValue}%`
      }
    };

  req.filterAndPagination = filterAndPaginationObject;
  next();
};

export {
  generateToken,
  authenticateToken,
  comparePassword,
  filterAndPagination
};
