import express from 'express';
import {createTag,getTags} from '../controllers/tagsController'

const router=express.Router();

router.post("/addtag",createTag);
router.get("/gettags",getTags);

export default router;