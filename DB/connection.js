import mongoose from "mongoose";



export const connecting =async()=>{
    return await mongoose.connect(`mongodb+srv://arsany:arsany123@cluster0.g6woxqn.mongodb.net/chatapp`).then((result)=>{
        console.log("connected to mongo");
    }).catch((err)=>{
        console.log(err);
    })
}