import { Router } from 'express';
import multer from 'multer';
import {addComment, getAllComments, updateComment,deleteComment} from '../controllers/comment.controllers.js';

const uploadMiddleware = multer({ dest: 'uploads/' });
const router = Router();

router.post('/create',uploadMiddleware.none(), addComment);

router.get('/getAll/:id', getAllComments);

router.patch('/update',uploadMiddleware.none(), updateComment);

router.delete('/delete', deleteComment);

export default router;