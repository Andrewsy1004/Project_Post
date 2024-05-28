import { Router } from 'express';
import { check } from 'express-validator';
import {validarInputs} from '../middlewares/index.js';
import { usuarioPost,login,validateCookie,logout } from '../controllers/user.controllers.js';
import {usernameExist} from '../helpers/db-validator.js';

const router = Router();

router.post('/register', [
    check("FullName", "The fullname is required").not().isEmpty(),
    check("username", "The username is required").not().isEmpty(),
    check("username").custom(usernameExist),
    check("password", "The password must be at least 6 characters long").isLength({min: 6}),
    validarInputs
],usuarioPost);

router.post('/login',login);

router.get('/profile',validateCookie);

router.post('/logout',logout);

export default router