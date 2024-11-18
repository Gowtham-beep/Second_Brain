import mongoose,{Schema,Document,Types} from "mongoose";

export interface ITags extends Document{
    title:string;
    UserId:Types.ObjectId;
}


const TagSchema:Schema = new Schema({
    title:{type:String,required:true},
    UserId:{type:Schema.ObjectId,ref:'User'}
})
export const Tags=mongoose.model<ITags>('Tags',TagSchema);