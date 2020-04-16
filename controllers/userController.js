import db from "../models/index";
import bcrypt from "bcrypt";
import { comparePassword } from "../helpers/userHelper";

const User = db.User;

const register = (req, res) => {
  // send email with activation link(open once)
  req.body["password"] = null;
  User.create(req.body)
    .then(data => res.send(data))
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

  if (!username || !password) {
    res.status(400).send({
      message: "Username and password are required"
    });
    return;
  }

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

  if (!usernameOrEmail || !password) {
    res.status(400).send({
      message: "Email/username and password are required!"
    });
    return;
  }

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
