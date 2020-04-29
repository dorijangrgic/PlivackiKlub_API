import db from "../models/index";
import bcrypt from "bcrypt";
import { comparePassword } from "../helpers/userHelper";
import { sendMail } from "../helpers/emailHelper";

const User = db.User;

const register = (req, res) => {
  req.body["password"] = null;
  User.create(req.body)
    .then(data => sendMail(data.email, "Kraljice moja", res))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user"
      })
    );
};

const activate = async (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  const password = req.body.password;

  const hashPassword = await bcrypt.hash(password, 10);

  User.findByPk(userId)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${userId} is not registered!`
        });
      } else if (!data.verified) {
        data.update({
          username: username,
          password: hashPassword,
          verified: true
        });
        res.status(200).send({
          message: `User is successfully activated`
        });
      } else {
        res.status(400).send({
          message: `User with id ${userId} is already activated!`
        });
      }
    })
    .catch(err => console.log(err.message));
};

const login = async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;

  let user = await User.findOne({ where: { email: usernameOrEmail } });

  if (user === null) {
    user = await User.findOne({ where: { username: usernameOrEmail } });
    if (user === null) {
      res
        .status(400)
        .send({ message: "User with given email/username does not exist!" });
      return;
    }
  }
  if (user.verified) {
    const token = comparePassword(password, user.dataValues);
    if (token === "") {
      res.status(400).send({ message: "Password is incorrect!" });
    } else {
      res.status(200).send({ token: token });
    }
  } else {
    res.status(400).send({ message: "User is not verified by admin!" });
  }
};

export { register, activate, login };
