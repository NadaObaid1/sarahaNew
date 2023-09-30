import MessageModel from "../../../DB/Model/Message.model.js"
import UserModel from "../../../DB/Model/User.model.js"

 export const getMessage = async(req, res)=>{
    const messageList = await MessageModel.find({reciverId:req.user._id})
    return res.json({message:"message", messageList})
}

 export const sendMessage = async(req, res)=>{
    const {reciverId} = req.params
    const {Message} = req.body

    const user = await UserModel.findById(reciverId)

    if(!user){
        return res.status(201).json({message:"user not found"})
    }

    const createMessage = await MessageModel.create({Message, reciverId})

    return res.status(201).json({message:"success"})
}
