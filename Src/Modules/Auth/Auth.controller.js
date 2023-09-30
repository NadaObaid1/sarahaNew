import UserModel from "../../../DB/Model/User.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../../../Servises/SendEmail.js";
import { SignUpSchema } from "./Auth.Vaildation.js";
import { SignInSchema } from "./Auth.Vaildation.js";

export const SignUp = async(req, res, next)=>{
   // return res.json(req.body) //للتأكد من الداتا انها بتوصل كلها
   const{name, email,password, gender} = req.body;
   const user = await UserModel.findOne({email})

   if(user){
    return res.status(404).json({message: "email exists"})
   }

   const hashpassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));

   const token = jwt.sign({email}, process.env.EMAILTOKEN, {expiresIn: '1h'})
   const refreshToken = jwt.sign({email}, process.env.EMAILTOKEN, {expiresIn: 60*60*24})
   const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}>`
   const refreshlink = `${req.protocol}://${req.headers.host}/auth/NewconfirmEmail/${refreshToken}>`
   const html = `<a href=${link}> confirm email </a> or <a href=${refreshlink}>new email to verify your email</a>`
   await sendEmail(email, "confirm email", html)
   const createUser = await UserModel.create({
    name, email, password:hashpassword, gender
   })
   return res.status(201).json({message: "success", user: createUser._id})
}


export const SignIn = async(req, res, next)=>{
    const{email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({message: "data invaid"});
    }
    if(!user.confirmEmail){
        return res.status(404).json({message: "plz confirm your email"});
    }
    const match = bcrypt.compareSync(password, user.password)
    if(!match){
        return res.status(404).json({message: "data invaid"});
    }
    const token = jwt.sign({id:user._id}, process.env.LOGINSINGURE)
    return res.status(200).json({message: "success", token});
}

export const confirmEmail = async(req, res, next) => {
        const token = req.params.token
        try {
            const decoded = jwt.verify(token, process.env.EMAILTOKEN);
            const user = await UserModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false  }, { confirmEmail: true });

            if(!user){
                return res.json({message: "your email is verified"})
            }
            else{
                return res.redirect(process.env.FRONTEND_LOGIN)
            }
          } catch (error) {
            console.error(error);
          }

        //return res.json({ message: "Your email is confirmed, please login" });
}

export const NewconfirmEmail = async(req, res, next) => {
    const {Refreshtoken} = req.params
    const decoded = jwt.verify(Refreshtoken, process.env.EMAILTOKEN);

    const token = jwt.sign({email: decoded.email}, process.env.EMAILTOKEN, {expiresIn: '1h'})
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}>`
    const html = `<a href=${link}> confirm email </a>`
    await sendEmail(decoded.email, "confirm email", html)

   return res.status(201).json({message: "new email is send successfully"})
}