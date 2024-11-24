import { RequestHandler } from 'express';
import {Tags} from '../models/Tags';

//creating new Tag
export const createTag:RequestHandler=async(req,res)=>{
try{
const {title,userId}=req.body;
const newTag= new Tags({title,userId});
const savedTag= await newTag.save();
res.status(201).json({
    message:"Tags created successfully",
    tag:savedTag
});
}catch(error){
res.status(500).json({
    message:"Error creatung tag",
    error:(error as Error).message,
});
}
};
//getting all tags
export const getTags:RequestHandler=async(req,res)=>{
try{
const tags= await Tags.find().populate("userId");
res.status(200).json({tags})
}catch(error){
res.status(500).json({
    message:"Error Fetching tags",
    error:(error as Error).message
});
}
};
