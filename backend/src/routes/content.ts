import express from "express";
import {createContent,getContents,updateContent,deleteContent} from '../controllers/contentController';

const router=express.Router();

router.post("/addContent",createContent);
router.get("/getContent",getContents);
router.put("/update/:id",updateContent);
router.delete("/delete/:id",deleteContent);

export default router;