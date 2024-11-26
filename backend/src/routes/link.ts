import express from "express";
import {generateLink,getContentByLink} from '../controllers/shareController';

const router = express.Router();

router.post("/generatelink",generateLink);
router.get("/contents/:hash",getContentByLink);

export default router;
