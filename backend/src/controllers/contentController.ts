import {RequestHandler} from 'express';
import {Content} from '../models/Content';


//create Content
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
//get Content
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
//update Content
export const updateContent:RequestHandler=async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedData=req.body;
        const updatedContent=await Content.findByIdAndUpdate(id,updatedData,{new:true});
        if(!updatedContent){
            res.status(404).json({message:"Content not found"});
            return;
        }
        res.status(200).json({
            message:"Content Updated successfully",
            content:updatedContent,
        });
        }catch(error){
            res.status(500).json({
                message:"Eroor in updating content",
                error:(error as Error).message,
            });
    }
}

export const deleteContent:RequestHandler=async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedContent= await Content.findByIdAndDelete(id);
        if(!deletedContent){
            res.status(404).json({message:"Contnet not found"});
            return;
        }
        res.status(200).json({
            message:"Content deleted successfully",
            content:deletedContent,
        });
    }catch(error){
        res.status(500).json({
            message:"Error deleting content",
            error:(error as Error).message,
        });
    }
}