import db from "../models/index";
import bcrypt from "bcrypt";
import { comparePassword } from "../helpers/userHelper";
import { sendMail } from "../helpers/emailHelper";

const User = db.User;
const Group = db.Group;
const Attendance = db.Attendance;
const Role = db.Role;

const register = (req, res) => {
  req.body["password"] = null;
  User.create(req.body)
    .then(data => {
      sendMail(
        data.email,
        `http://localhost:3000/users/activate/${data.id}`,
        res
      );
      return res
        .status(200)
        .send({ message: "User successfully registered, email sent!" });
    })
    .catch(err =>
      res.status(500).send({
        message: err.message
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
    .catch(err => res.status(500).send({ message: err.message }));
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
    res.status(400).send({ message: "User is not verified!" });
  }
};

const findAll = (req, res) => {
  const filterAndPagination = req.filterAndPagination;
  filterAndPagination["include"] = ["group", Role];

  User.findAll(filterAndPagination)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findAttendances = async (req, res) => {
  const id = req.params.id;
  console.log("User id", id);

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }

  Attendance.findAll({
    where: {
      userId: id
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id,{
    attributes: { exclude: ['password'] }
  })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "User does not exist" });
      } else res.status(200).send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const update = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }

  user
    .update(req.body)
    .then(data => res.send({ message: "User updated successfully" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }

  user
    .destroy()
    .then(data => res.send({ message: "User deleted successfully" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

export {
  register,
  activate,
  login,
  findAll,
  findOne,
  findAttendances,
  update,
  deleteUser
};
