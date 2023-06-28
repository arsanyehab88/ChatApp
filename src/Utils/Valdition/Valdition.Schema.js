import joi from "joi"


export const SignUPVlad = joi.object({
    name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


export const SignInVlad = joi.object({
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})






