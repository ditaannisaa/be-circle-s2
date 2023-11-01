import * as Joi from "joi";

export const ThreadsSchemaValidate = Joi.object({
  content: Joi.string().required(),
  image: Joi.string(),
});

export const UpdateThreadsSchemaValidate = Joi.object({
  content: Joi.string().min(8).required(),
  image: Joi.string(),
});
