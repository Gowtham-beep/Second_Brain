import mongoose,{Schema,Document,Types} from "mongoose";
import {User} from './User'

export interface ITags extends Document{
    title:string;
    userId:Types.ObjectId;
}


const TagSchema:Schema = new Schema({
    title:{type:String,required:true},
    userId:{type:Schema.ObjectId,ref:'User'}
})
export const Tags=mongoose.model<ITags>('Tags',TagSchema);