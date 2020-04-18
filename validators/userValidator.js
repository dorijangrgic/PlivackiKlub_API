import { body } from "express-validator";
import db from "../models";

const User = db.User;
const Role = db.Role;
const Group = db.Group;

const userActivateValidationRules = () => {
  return [
    body("username", "Name is required").exists(),
    body("password", "Password is required").exists()
  ];
};

const userRegisterValidationRules = () => {
  return [
    body("first_name", "First name is required").exists(),
    body("last_name", "Last name is required").exists(),
    body("email", "Email is required")
      .exists()
      .isEmail()
      .custom(value => {
        return User.findOne({ where: { email: value } }).then(data => {
          if (data) throw new Error("User with given email already exists");
        });
      }),
    body("date_of_birth", "Date of birth is required").exists(),
    body("roleId")
      .exists()
      .custom(value => {
        return Role.findByPk(value).then(data => {
          if (!data) throw new Error("Role does not exist");
        });
      }),
    body("groupId")
      .exists()
      .custom(value => {
        return Group.findByPk(value).then(data => {
          if (!data) throw new Error("Group does not exist");
        });
      })
  ];
};

const userLoginValidationRules = () => {
  return [
    body("usernameOrEmail", "Email/username is required").exists(),
    body("password", "Password is required").exists()
  ];
};

export {
  userActivateValidationRules,
  userRegisterValidationRules,
  userLoginValidationRules
};
