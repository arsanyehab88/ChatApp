import userRoutes from "./src/Modules/User/User.Routes.js"
import GlobalErrorHandling from "./src/Utils/MiddleWare/GlobalErorrHandling/GlobalErorrHandling.js"





export function init(app) {
    app.use("/user", userRoutes)

    app.use(GlobalErrorHandling)

}