import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
const MessageSchema = new Schema({
    Message:{
        type: String,
        required: true,
    },
    reciverId:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    }},
    {
        timestamps:true
    });

    const MessageModel = mongoose.model.Message || model("Message", MessageSchema);

    export default MessageModel;