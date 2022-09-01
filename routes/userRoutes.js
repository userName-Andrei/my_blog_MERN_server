import express from 'express';
import multer from 'multer';

import checkAuth from '../middlewares/checkAuth.js';
import resizeImg from '../middlewares/resizeImg.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { userValidation } from '../validation.js';
import { UserController } from '../controllers/index.js';

const userRoutes = express.Router();

const upload = multer({storage: multer.diskStorage({
    destination: 'uploads/img/avatars',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.body.email + file.originalname.match(/\.jpeg|\.jpg|\.png|\.gif/)[0])
    }
})});

userRoutes.post('/register', upload.single('avatar'), resizeImg, userValidation, handleValidationErrors, UserController.register)

userRoutes.post('/login', UserController.login)

userRoutes.get('/me', checkAuth, UserController.getMe)

export default userRoutes