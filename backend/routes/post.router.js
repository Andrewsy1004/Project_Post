import { Router } from 'express';
import multer from 'multer';
import { createPost,getAllPost,getPost,editPost,deletePost } from '../controllers/post.controllers.js';

const uploadMiddleware = multer({ dest: 'uploads/' });
const router = Router();

router.post('/create',uploadMiddleware.none(), createPost);

router.get('/getAllPost', getAllPost);

router.get('/getPost/:id', getPost);

router.put('/editPost', uploadMiddleware.none(), editPost);

router.delete('/deletePost/:id', deletePost);

export default router;