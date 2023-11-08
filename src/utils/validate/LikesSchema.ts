import * as Joi from "joi";

export const LikesSchemaValidate = Joi.object({
  user: Joi.number(),
  thread: Joi.number().required(),
});
