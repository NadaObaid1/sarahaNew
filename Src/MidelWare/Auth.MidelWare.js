import jwt from "jsonwebtoken"
import UserModel from "../../DB/Model/User.model.js";

export const auth = async(req, res, next) => {
    try{
        const {authorization} = req.headers;
       // return res.json(authorization)

        if(!authorization?.startsWith(process.env.BERERKEY)){
            return res.json({massege:"invaid authorization"})
        } 
        const token = authorization.split(process.env.BERERKEY)[1]
        //return res.json(token)
        if(!token){
           return res.json({massege:"token is required"})
        }

        const decoded = jwt.verify(token, process.env.LOGINSINGURE)
        //return res.json(decoded)
        const authuser = await UserModel.findById(decoded.id).select("name email")
        if(!authuser){
            return res.json({massege:"account not register"})
        }
         req.user = authuser;
         next();

    }catch(err){
        return res.json({massege:"err", err:err.stack})
    }}