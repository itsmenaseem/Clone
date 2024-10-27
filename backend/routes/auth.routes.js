import express from "express";
import { login, signup ,logout,myprofile} from "../contollers/auth.conrollers.js";
import verify from "../middleware/verify.js";

const router=express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/myprofile", verify,myprofile)

export default router;