import { Router } from "express";
import * as users from "./User.controller.js";
import { FileUpload } from "../../Utils/UploadPhoto/FileUpload.js";
import { Validition } from "../../Utils/MiddleWare/Valdition/valdition.js";
import { SignInVlad, SignUPVlad } from "../../Utils/Valdition/Valdition.Schema.js";



const userRoutes = Router()



userRoutes.route("/")
    .put(users.ChangePassword);




userRoutes.post("/signIn", Validition(SignInVlad), users.SignIn)
userRoutes.post("/signUP", FileUpload(), Validition(SignUPVlad) ,users.Signup)

export default userRoutes;