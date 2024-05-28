import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import postRouter from './routes/post.router.js';
import addComment from './routes/comment.router.js';

import {dbConnection} from './database/config.js';
import 'dotenv/config';


const app = Express();
const PORT = process.env.PORT || 3001;

dbConnection();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(Express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', addComment);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
