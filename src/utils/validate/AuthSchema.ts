import * as Joi from "joi";

export const RegisterSchemaValidate = Joi.object({
  username: Joi.string().min(8).required(),
  password: Joi.string().min(8).required(),
  full_name: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export const LoginSchemaValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
