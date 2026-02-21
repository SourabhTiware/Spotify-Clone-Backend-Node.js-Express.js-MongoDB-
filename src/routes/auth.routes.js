import express from "express";
import authController from "../controllers/auth.controller.js"; // import controller logic from the auth.controller.js
import userMiddlwer from "../middlewares/user.middlwer.js";


    const router = express.Router();

// Create router  and write logic in controller. 


    router.post("/register",userMiddlwer.registerUser, authController.registerUser);
    router.post("/login", authController.loginUser);



export default router;