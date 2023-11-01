import * as Joi from "joi";

export const RepliesSchemaValidate = Joi.object({
    text: Joi.string(),
    image: Joi.string(),
    user: Joi.number().required(),
    thread: Joi.number().required(),
})

export const UpdateRepliesSchemaValidate = Joi.object({
    text: Joi.string(),
    image: Joi.string(),
})