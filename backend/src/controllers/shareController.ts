import {RequestHandler} from 'express';
import { Link } from '../models/Link';
import { User } from '../models/User';
import crypto from 'crypto';

export const generateLink:RequestHandler=async (req,res)=>{
    try{
        const {userId}=req.body;
        const user= User.findById({userId});
        if(!user){
            res.status(404).json({message:"User not found"})
        }
    const hash=crypto.randomBytes(16).toString("hex");
    const link=await Link.create({hash,userId});
    const sharableurl=`${req.protocol}://${req.get("host")}/api.v1/content/${link.hash}`
    res.status(201).json({
        message:"Sharale Link generated",
        sharableurl:sharableurl,
    })
    }catch(error){
        res.status(500).json({
            message:"Error generating link",
            error:(error as Error).message,
        })
    }
}