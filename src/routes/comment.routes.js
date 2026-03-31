import express from "express";
import{
    addComment,
    getComments,
    editComment
} from "../controllers/comment.controller.js"

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/comments', verifyToken, addComment);
router.get('/comments/:taskId', verifyToken, getComments);
router.put('/comments/:id', verifyToken, editComment);

export default router;