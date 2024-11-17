import mongoose,{Schema,Document} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

//Database connection
const DatabaseConnection=async():Promise<void>=>{
    try{
        await mongoose.connect(process.env.mongodb_connection_URl||'')
        console.log("Database connected")
    }catch(error){
        console.log("DataBase connecton failed",error)
    }
};
export {
    DatabaseConnection
}