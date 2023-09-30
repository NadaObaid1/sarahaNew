import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    gender:{
        type: String,
        default: "Male",
        enum: ["Male", "Female"]
    },

    age:{
        type : Number
    }

},
    {
        timestamps:true
    });

    const UserModel = mongoose.model.User || model("User", UserSchema);

    export default UserModel;