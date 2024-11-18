import mongoose,{Schema,Document} from "mongoose";

interface IUser extends Document{
    username:string;
    password:string;
}
const Userschema:Schema = new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
export const User= mongoose.model<IUser>('User',Userschema);