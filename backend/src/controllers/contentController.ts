import {RequestHandler} from 'express';
import {Content} from '../models/Content';
import {Tags} from '../models/Tags';

export const createContent:RequestHandler=async(req,res)=>{
    try{
        const{link,type,title,tags,userId}=req.body;
        const newContent=new Content({
            link,type,title,tags,userId,
        });
        const savedContent =await newContent.save();
        res.status(201).json({
            message:"Content created successfully",
            content:savedContent,
        });
    }catch(error){
        res.status(500).json({
            message:"Error creating content",
            error:(error as Error).message
        });
    }

};

export const getContents:RequestHandler=async(req,res)=>{
    try{
        const contents= await Content.find().populate("tags").populate("userId");
        res.status(200).json({contents});
    }catch(error){
        res.status(500).json({
            message:"Error in fetching contents",
            error:(error as Error).message,
        });
    }
};