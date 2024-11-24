import mongoose,{Schema,Document,Types} from "mongoose";
import {User} from './User'
import {Tags} from './Tags'
export interface Icontent extends Document{
    link:string;
    type:'video'|'image'|'document';
    title:string;
    tags:Types.ObjectId[];
    userId:Types.ObjectId;
}

const contentSchema:Schema = new Schema({
  link:{type:String,required:true},
  type:{
    type:String,
    required:true,
    enum:['video','image','document']
  },
  title:{type:String,required:true},
  tags:[{type:Schema.ObjectId,ref:'Tags'}],
  userId:{type:Schema.ObjectId,ref:'User',required:true}
})

export const Content=mongoose.model<Icontent>('Content',contentSchema)