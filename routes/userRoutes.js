import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { userValidation } from '../validation.js';
import { UserController } from '../controllers/index.js';

const userRoutes = express.Router();

userRoutes.post('/register', userValidation, handleValidationErrors, UserController.register)

userRoutes.post('/login', UserController.login)

userRoutes.get('/me', checkAuth, UserController.getMe)

export default userRoutes