import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js";
import { signupNurse } from "../controllers/nurse.controller.js"
import { getUserDetails } from "../controllers/nurse.controller.js"
import { updateUserDetails } from "../controllers/nurse.controller.js";

const nurseRoute = express.Router()

nurseRoute.post("/signup", signupNurse)
nurseRoute.get("/user/:userId/details", getUserDetails);
nurseRoute.put("/user/:userId/details", verifyToken, updateUserDetails);

export default nurseRoute
