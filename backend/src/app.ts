import express,{Application } from "express";
import cors from 'cors'
import {DatabaseConnection} from './db/db';

const app:Application=express();
//middlewares
app.use(cors());
app.use(express.json());

DatabaseConnection()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Serever is running on http://localhost:3000")
    })
})
.catch((error)=>{
console.log("Failed to connect to the database:",error)
});