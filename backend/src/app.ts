import express,{Application } from "express";
import cors from 'cors'
import {DatabaseConnection} from './db/db';
import auth  from './routes/auth'
import  content from './routes/content';
import tags from './routes/tags'
import link from './routes/link'


const app:Application=express();
//middlewares
app.use(cors());
app.use(express.json());
//routes
app.use('/api/v1/user',auth)
app.use('/api/v1/content',content)
app.use('/api/v1/tags',tags)
app.use('/api/v1/sharables',link)


DatabaseConnection()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Serever is running on http://localhost:3000")
    })
})
.catch((error)=>{
console.log("Failed to connect to the database:",error)
});