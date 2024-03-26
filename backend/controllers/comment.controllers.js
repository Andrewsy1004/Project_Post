import jwt from 'jsonwebtoken';
import CommentModel from '../models/Comment.js';
import 'dotenv/config';

const secret = process.env.SECRET;

export const addComment = async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {comment,post} = req.body;
    
    const newComment = new CommentModel({
      comment,
      post,
      author: info.id
    })

    await newComment.save();
    res.json(newComment);

  });
}

export const getAllComments = async (req, res) => {
     try {
         const {id} = req.params;
         const comments = await CommentModel.find({post:id})
                       .sort({createdAt: -1})
                       .populate('author', ['username']);
                      
         res.json(comments);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
}

export const updateComment = async (req, res) => {
  const { comment, id } = req.body;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(id, { comment });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteComment = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}