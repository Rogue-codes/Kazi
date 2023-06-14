import jwt from "jsonwebtoken"
import User from "../model/model.js"

export const authMiddleware = async(req, res, next) =>{
    const authToken = req.cookies.access_token;

    try{
        if(authToken){
            const decoded = jwt.verify(authToken,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userID) 
            next()
        }else{
            res.status(401).json({
                status:"failed",
                message:"No token found"
            })
        }
    }catch(error){
        res.status(401).json({
            status:"failed",
            message:error.message
        })
    }

}