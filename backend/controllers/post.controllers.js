import jwt from 'jsonwebtoken';
import PostModel from '../models/Post.js'; 
import 'dotenv/config';

const secret = process.env.SECRET;

export const createPost = async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content,cover} = req.body;
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover:cover,
      author:info.id,
    });
    res.json(postDoc);
  });
}

export const getAllPost = async (req, res) => {
  try {
      const posts = await PostModel.find()
                    .sort({createdAt: -1})
                    .populate('author', ['username']);
                   
      res.json(posts);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const {id} = req.params;
  const postDoc = await PostModel.findById(id).populate('author', ['username']);
  res.json(postDoc);
}

export const editPost = async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content,cover} = req.body;
    const postDoc = await PostModel.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    
    const coverUrl = cover!=='' ? cover : postDoc.cover;
    
    const updatedPost = await PostModel.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover:coverUrl,
      author:info.id,
    })
    res.json(updatedPost);  
  });
}

export const deletePost = async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id} = req.params;
    const postDoc = await PostModel.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    
    await PostModel.findByIdAndDelete(id);
    return res.status(200).json('deleted');
  });
}