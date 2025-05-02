import express from "express"
import { login, signup, updateProfile } from "../controllers/user.controller.js"
import { signupNurse } from "../controllers/nurse.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const authroutes = express.Router()

authroutes.post('/signup', signup)
authroutes.post('/nurse/signup', signupNurse)
authroutes.post('/login', login)

export default authroutes