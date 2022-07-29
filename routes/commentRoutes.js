import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { commentValidation } from '../validation.js';
import { CommentController } from '../controllers/index.js';

const commentRoutes = express.Router();

commentRoutes.post('/comments/:postId', checkAuth, commentValidation, handleValidationErrors, CommentController.create)
commentRoutes.delete('/comments/:id', checkAuth, CommentController.remove)
commentRoutes.get('/comments/:postId', CommentController.getCommentsByPostId)
commentRoutes.get('/comments', CommentController.getAll)            // /comments?limit=5

export default commentRoutes;