import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { VideoController } from "./controllers/VideoController";
import { TokenMiddleware } from "./middlewares/TokenMiddleware";

const usercontroller = new UserController()
const videocontroller = new VideoController()
const tokenmiddleware = new TokenMiddleware()

const router = Router()

router.post("/Register", usercontroller.RegisterUser)
router.post("/Authenticate", usercontroller.AuthenticateUser)

router.post("/AddVideo", tokenmiddleware.TokenVerify, videocontroller.AddVideo)
router.get("/GetVideos", videocontroller.GetVideos)
router.post("/GetExpeficyVideo", videocontroller.GetExpecifyVideo)

export { router }