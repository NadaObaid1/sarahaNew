import userModel from "../../../DB/Model/User.model.js"
export const profile = async(req, res) =>{
    //const user = await userModel.findById(req.id)
    return res.json({message: req.user})
} 
