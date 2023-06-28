import * as dotenv from 'dotenv'
dotenv.config()
import { Server } from "socket.io";
import express from "express"
import { connecting } from './DB/connection.js';
import { init } from './index.js';
import { UserModel } from './DB/Models/User/UserModel.js';
import cors from 'cors'
import { messageModel } from './DB/Models/Message/MessageModel.js';



const app = express()
const port = 5001
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


connecting()
init(app)


const server = app.listen(process.env.PORT || port, () => {
    console.log('server listening on ' + port);
})

const io = new Server(server, {
    cors: "*"
})




async function getLastMessage(room) {
    let roomMessages = await messageModel.aggregate([
        { $match: { to: room } },
        {
            $group: {
                _id: {
                    $dateToString: {
                        date: '$_id',
                        format: "%m/%d/%Y",
                    },
                }, messagesByDate: { $push: '$$ROOT' }
            }
        },
    ])
    return roomMessages;
}

async function sortlastmessages(messages) {
    return messages.sort(function (a, b) {
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1];

        return date1 < date2 ? -1 : 1
    })
}



/* io.on('connection', (socket) => {

    socket.on('new-user', async () => {
        const members = await UserModel.find();
        io.emit('new-user', members)
    })

    socket.on("join-room", async (newRoom, perviousRoom) => {
        socket.join(newRoom)
        socket.leave(perviousRoom)
        let roomMessage = await getLastMessage(newRoom)
        roomMessage =await sortlastmessages(roomMessage)
        socket.emit("room-messages", roomMessage)
    })

    socket.on("message-room", async (room, content, sender, time, data) => {
        const newMessage = await messageModel.create({ content, from: sender, time, data, to: room })

        let roomMessage = await getLastMessage(room)

        roomMessage = await sortlastmessages(roomMessage)

        io.to(room).emit('room-messages', roomMessage)

        socket.broadcast.emit("notifications", room)
    })

    app.put("/Logout", async (req, res) => {
        try {
            const { _id, messages } = req.body
            const user = await UserModel.findByIdAndUpdate({ _id }, { status: "offline", messages })
            const members = await UserModel.find()
            socket.broadcast.emit("new-user", members)
            res.status(200).send()
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    })

}) */

io.on('connection', (socket) => {

    socket.on('new-user', async () => {
        const members = await UserModel.find();
        io.emit('new-user', members)
    })

    socket.on('join-room', async (newRoom, previousRoom) => {
        socket.join(newRoom);
        socket.leave(previousRoom);
        let roomMessages = await getLastMessage(newRoom);
        roomMessages = await sortlastmessages(roomMessages);
        socket.emit('room-messages', roomMessages)
    })

    socket.on('message-room', async (room, content, sender, time, date) => {
        const newMessage = await messageModel.create({ content, from: sender, time, date, to: room });
        let roomMessages = await getLastMessage(room);
        roomMessages = await sortlastmessages(roomMessages);
        // sending message to room
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room)
    })

    app.put("/Logout", async (req, res) => {
        try {
            const { _id, messages } = req.body
            const user = await UserModel.findByIdAndUpdate({ _id }, { status: "offline", messages })
            const members = await UserModel.find()
            socket.broadcast.emit("new-user", members)
            res.status(200).send()
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    })

})

