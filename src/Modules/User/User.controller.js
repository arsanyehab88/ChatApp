import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../../Utils/Services/AppError.js"
import { UserModel } from "../../../DB/Models/User/UserModel.js"
import bcrypt from 'bcrypt'
import cloudinary from "../../Utils/UploadPhoto/cloudinary.js"



export const Signup = CathchAsyncErorr(async (req, res, next) => {
    let { secure_url } = await cloudinary.uploader.upload(req.file.path)
    let found = await UserModel.findOne({ email: req.body.email })
    found && next(new AppError("Email Already Exists", 409))
    found && next(new AppError("Name Already Exists",))
    req.body.ProfilePic = secure_url
    let user = await UserModel(req.body)
    let add = await user.save();
    add.password = undefined
    res.json({ message: "Done", add })

})


export const SignIn = CathchAsyncErorr(async (req, res, next) => {
    const { email, password } = req.body
    let result = await UserModel.findOne({ email })
    if (!result) return next(new AppError("Email Dont Register", 409))
    const match = bcrypt.compareSync(password, result.password)
    if (!match) return next(new AppError("Password Not Match", 403))
    if (result && match) {
        let add = await UserModel.findByIdAndUpdate(result._id, { status: "online" })
        add.password = undefined
        return res.json({ message: "Done", add })
    }
    return next(new AppError("Email Not Found", 404))
})









export const ChangePassword = CathchAsyncErorr(async (req, res, next) => {
    const { _id, password, Cpassword } = req.body
    if (password !== Cpassword) return next(new AppError("Password Not Match", 403))
    let update = await UserModel.findOneAndUpdate({ _id }, { password: password }, { new: true })
    !update && next(new AppError("Not Found user", 404)) 
    update.password=undefined
    update && res.json({ message: "Done", update })
})
