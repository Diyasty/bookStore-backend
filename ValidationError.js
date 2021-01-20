const Joi = require("joi");

let registerValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data);
};

let loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().min(6).max(30).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidate,
  loginValidate,
};
