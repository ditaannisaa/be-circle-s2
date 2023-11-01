import * as Joi from "joi"

export const LikesSchemaValidate = Joi.object({
    user: Joi.number().required(),
    thread: Joi.number().required()
})