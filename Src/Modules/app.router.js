import messageRouter from "./Message/Message.router.js"
import AuthRouter from "./Auth/Auth.router.js"
import UserRouter from "./User/User.router.js"
import ConnectDb from "../../DB/ConnectionDb.js"
import express from 'express'
import cors from  'cors'

const initApp = (app, express)=>{
    ConnectDb()
    app.use(express.json())
    app.use(cors())
    app.use("/message", messageRouter)
    app.use("/auth", AuthRouter)
    app.use("/user", UserRouter )
    app.use("*", (req,res) => {
        return res.json({message:"page not found"})
    })
}

export default initApp;

