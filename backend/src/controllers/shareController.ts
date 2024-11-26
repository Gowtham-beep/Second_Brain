import {RequestHandler} from 'express';
import { Link } from '../models/Link';
import { User } from '../models/User';
import { Content } from '../models/Content';
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
    const sharableurl=`${req.protocol}://${req.get("host")}/api/v1/sharables/contents/${link.hash}`
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
};

export const  getContentByLink: RequestHandler=async(req,res)=>{
try{
const {hash}=req.params;
const link=await Link.findOne({hash});
if(!link ){
    res.status(404).json({messsage:"Link Not found or expired"})
}
if(link!=null){
    const contents=await Content.find({userId:link.userId}).populate("tags");
res.status(200).json({contents})
}
}catch(error){
res.status(500).json({
    message:"Error fetching contents",
    error:(error as Error).message,
});
}
};