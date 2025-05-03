import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js";
import { signupNurse, getProfile, getUserDetails, updateProfile, updateUserDetails } from "../controllers/nurse.controller.js"

const nurseRoute = express.Router()

nurseRoute.post("/signup", signupNurse)
nurseRoute.get("/user/:userId/details", getUserDetails);
nurseRoute.put("/user/:userId/details", verifyToken, updateUserDetails);
nurseRoute.put("/profile", verifyToken, updateProfile)
nurseRoute.get("/profile", verifyToken, getProfile);

export default nurseRoute
