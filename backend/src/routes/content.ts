import express from "express";
import {createContent} from '../controllers/contentController';

const router=express.Router();

router.post("/addContent",createContent);

export default router;