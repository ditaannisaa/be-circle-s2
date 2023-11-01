import * as Joi from "joi";

export const UserSchemaValidate = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
    full_name: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    profile_picture: Joi.string(),
    profile_description: Joi.string(),
})
