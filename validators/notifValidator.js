import { body } from "express-validator";

const notifValidationRules = () => {
  return [
    body("title", "Title is required").exists(),
    body("description", "Description is required").exists()
  ];
};

export default notifValidationRules;
