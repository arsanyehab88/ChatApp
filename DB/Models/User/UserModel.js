import mongoose from 'mongoose';
import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name Is Required"],
        minLength: [1, "too short category name"]
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        minLength: [5, "too short category name"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "MinLength 6 characters"]
    },
    ProfilePic: String,
    status: {
        type: String,
        enums: ["online", "offline"],
        default: "online"
    },
    newMessages: {
        type: Object,
        default: {}
    }
}, {
    minimize: false
})

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})

UserSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 7)
    }
})


export const UserModel = mongoose.model("User", UserSchema)
