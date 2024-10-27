import jwt from "jsonwebtoken"

function generateToken(id,res){
    const payload={id:id}
    const token=jwt.sign(payload,"secret",{
        expiresIn:"10d"
    });
    res.cookie("login",token,{
        maxAge:10*24*60*60*100,
        httpOnly:true
    })
}

export default generateToken;