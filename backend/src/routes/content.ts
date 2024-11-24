import express from "express";
import {createContent,getContents,updateContent} from '../controllers/contentController';

const router=express.Router();

router.post("/addContent",createContent);
router.get("/getContent",getContents);
router.put("/update/:id",updateContent)

export default router;