import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET;


export const usuarioPost = async(req, res) => {
    try {
        const {FullName, username, password} = req.body;
        const User = new UserModel({FullName, username, password});
    
        const salt = bcrypt.genSaltSync();
        User.password = bcrypt.hashSync(password, salt);
    
        await User.save();
    
        jwt.sign({ username, id: User._id }, secret, {}, (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie('token', token, { httpOnly: true }).json({
                id: User._id,
                username,
            });
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error to create user',
            error
        });
    }
}

export const login = async(req, res) => {
    const { username, password } = req.body;

    try {
        const User = await UserModel.findOne({ username });
    
        if (!User || !bcrypt.compareSync(password, User.password)) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid username or password'
            });
        }
        
        jwt.sign({ username, id: User._id }, secret, {}, (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie('token', token, { httpOnly: true }).json({
                id: User._id,
                username,
            });
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred. Please try again later.'
        });
    }
}

export const validateCookie = async(req, res) => {
    const {token} = req.cookies;
     jwt.verify(token, secret, {}, (err,info) => {
     if (err) throw err;
     res.json(info);
  });
}   

export const logout = async(req, res) => {
    res.cookie('token', '').json({ok:true});
}