import { body } from "express-validator";
import db from "../models";
const Training = db.Training;
const User = db.User;

const attendanceCreateValidationRules = () => {
  return [
    body("trainingId")
      .exists()
      .custom(value => {
        return Training.findByPk(value).then(data => {
          if (!data) throw new Error(`Training does not exist`);
        });
      }),
    body("userIds.*.id").custom(value => {
      return User.findByPk(value).then(data => {
        if (!data) throw new Error(`User with id ${value} does not exist`);
      });
    }),
    body("userIds.*.finished").exists()
  ];
};

const attendanceUpdateValidationRules = () => {
  return [
    body("finished").exists()
  ];
};

export { attendanceCreateValidationRules, attendanceUpdateValidationRules };
