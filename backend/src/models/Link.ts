import mongoose,{Schema,Document,Types} from "mongoose";
import {User} from './User'

export interface Ilink extends Document{
    title:string;
    userId:Types.ObjectId;
}

const LinkSchema:Schema=new Schema({
    title:{type:String,required:true},
    userId:{type:Schema.ObjectId,ref:"User",required:true}
})

export const Link=mongoose.model<Ilink>("Link",LinkSchema)
