import { body } from "express-validator";
import db from "../models";
const Club = db.Club;

const groupCreateValidationRules = () => {
  return [
    body("name", "Name is required").exists(),
    body("clubId")
      .exists()
      .custom(value => {
        return Club.findByPk(value).then(data => {
          if (!data) throw new Error("Club does not exist");
        });
      })
  ];
};

const groupUpdateValidationRules = () => {
  return [body("name", "Name is required").exists()];
};

export { groupCreateValidationRules, groupUpdateValidationRules };
