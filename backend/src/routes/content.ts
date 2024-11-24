import express from "express";
import {createContent,getContents} from '../controllers/contentController';

const router=express.Router();

router.post("/addContent",createContent);
router.get("/getContent",getContents)

export default router;