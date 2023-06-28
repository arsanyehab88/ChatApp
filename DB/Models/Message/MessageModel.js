import mongoose from "mongoose";



const messageSchema = new mongoose.Schema({
    content:String,
    from:Object,
    to:Object,
    time:String,
    date:String,
    socketId:String    
})



export const messageModel = mongoose.model('Message',messageSchema)