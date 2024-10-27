import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

 async function verify(req, res, next) {
    try {
        const token = req.cookies.login;
    if(!token) return res.status(401).json({msg: "Token is not provided"});
    const payload= jwt.verify(token,"secret");
    if(!payload) return res.status(401).json({msg: "Token is invalid"});
    const user=await userModel.findOne({_id:payload.id}).select("-password");
    req.user = user;
    next();
    } catch (error) {
        res.json({error: error.message});
    }
}

export default verify;