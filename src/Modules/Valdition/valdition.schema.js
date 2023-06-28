import joi from "joi"


export const signInSchema = joi.object({
    password: joi.string()
        .pattern((/^[a-zA-Z0-9]{3,30}$/)).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','lol'] } }).required()
})

export const signUpSchema = joi.object({
    name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi.string()
        .pattern((/^[a-zA-Z0-9]{3,30}$/)).required(),
    repeat_password: joi.any().valid(joi.ref('password')).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','lol'] } }).required(),
    age: joi.number().min(18).required()
})