import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { postValidation } from '../validation.js';
import { PostController } from '../controllers/index.js';

const postRoutes = express.Router();

postRoutes.post('/posts', checkAuth, postValidation, handleValidationErrors, PostController.create)
postRoutes.delete('/posts/:id', checkAuth, PostController.remove)
postRoutes.put('/posts/:id', checkAuth, PostController.update)
postRoutes.get('/posts', PostController.getAll)                 // posts?lastpost=2&limit=5
postRoutes.get('/posts/:id', PostController.getOne)
postRoutes.get('/posts/tags/:tag', PostController.getPostsByTag)

export default postRoutes;