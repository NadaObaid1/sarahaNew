import mongoose from "mongoose"

const ConnectDb = async()=>{
   return await mongoose.connect(process.env.DBLOCAL)
    .then (()=>{
        console.log("connect db is est")
    })
    .catch((err)=>{
        console.log(`connect db err : ${err}`)
    })
}

export default ConnectDb;