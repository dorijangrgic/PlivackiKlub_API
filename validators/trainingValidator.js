import { body } from "express-validator";
import db from "../models";
const Group = db.Group;
const Task = db.Task;

const trainingValidationRules = () => {
  return [
    body("groupId")
      .exists()
      .custom(value => {
        return Group.findByPk(value).then(data => {
          if (!data) throw new Error("Group does not exist");
        });
      }),
    body("taskIds.*").custom(value => {
      return Task.findByPk(value).then(data => {
        if (!data) throw new Error(`Task ${value} does not exist`);
      });
    })
  ];
};

export default trainingValidationRules;
