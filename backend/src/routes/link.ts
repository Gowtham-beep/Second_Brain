import express from "express";
import {generateLink} from '../controllers/shareController';

const router = express.Router();

router.post("/generateLink",generateLink);

export default router;
