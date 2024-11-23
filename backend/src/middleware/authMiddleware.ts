import jwt,{JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv';
import {RequestHandler} from 'express'

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the env varibles");

}
export const authMiddleware:RequestHandler=(req,res,next)=>{
    try{
        const token=req.headers.token as string;
        if(!token){
            res.status(401).json({
                message:"Token is missing"
            });
        }
        const decodedData=jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(decodedData && typeof decodedData==="object"){
            req.userId=decodedData.id
            next();
        }else{
            res.status(403).json({
                message:"You are not authorized"
            })
        }

    }catch(error){
        res.status(403).json({
            message:"Inavlid or Expired Token",
            erroe:(error as Error).message,
        });
    }

};
