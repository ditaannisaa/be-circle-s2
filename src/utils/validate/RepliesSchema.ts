import * as Joi from "joi";

export const RepliesSchemaValidate = Joi.object({
  text: Joi.string(),
  image: Joi.string(),
  user: Joi.number(),
  thread: Joi.number(),
});

export const UpdateRepliesSchemaValidate = Joi.object({
  text: Joi.string(),
  image: Joi.string(),
});
