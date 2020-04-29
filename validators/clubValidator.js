import { body } from "express-validator";

const clubValidationRules = () => {
  return [
    body("name", "Name is required").exists(),
    body("address", "Address is required").exists(),
    body("postCode", "Post code is required").exists(),
    body("oib", "OIB is required").exists()
  ];
};

export default clubValidationRules;
