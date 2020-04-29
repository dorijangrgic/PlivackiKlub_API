import { body } from "express-validator";

const taskValidationRules = () => {
  return [
    body("name", "Name is required").exists(),
    body("description", "Description is required").exists(),
    body("intensity", "Intensity code is required")
      .exists()
      .isIn(["1", "2", "3", "4", "5"])
      .withMessage("Intensity should have value between 1 (very easy) and 5 (very hard)"),
    body("duration", "Duration is required").exists()
  ];
};

export default taskValidationRules;
