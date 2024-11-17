import mongoose,{Schema,Document} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

//Database connection
const DatabaseConnection=async():Promise<void>=>{
    try{
        const mongoUrl = process.env.mongodb_connection_URl;
        if (!mongoUrl) {
            throw new Error('Missing mongodb_connection_URl environment variable');
        }
        await mongoose.connect(mongoUrl);
        console.log("Database connected")
    }catch(error){
        console.log("DataBase connecton failed",error)
    }
};
export {
    DatabaseConnection
}