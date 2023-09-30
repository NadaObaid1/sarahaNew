import joi from "joi"

export const SignUpSchema = {
body: joi.object({
    name: joi.string().alphanum().required(),
    email : joi.string().email(),
    age : joi.number().integer().required().min(5). max(80),
    password : joi.string().required().min(5),
    gender : joi.string().valid('Male', 'Female'),
    cpassword : joi.string().valid(joi.ref('password')).required()

})
}
export const SignInSchema = joi.object({
    email : joi.string().email().messages({
        'string.empty': "email is requried",
        'string.email' : "plz enter avalid email"
    }),
    password : joi.string().required().min(5).messages({
        'string.empty': "password is requried",
    })
})