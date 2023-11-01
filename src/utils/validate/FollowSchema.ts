import * as Joi from "joi";

export const FollowSchemaValidate = Joi.object({
  follower_id: Joi.number(),
  following_id: Joi.number(),
});
