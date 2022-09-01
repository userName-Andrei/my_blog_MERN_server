import express from 'express';
import multer from 'multer';

import checkAuth from '../middlewares/checkAuth.js';
import resizeImg from '../middlewares/resizeImg.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { postValidation } from '../validation.js';
import { PostController } from '../controllers/index.js';

const postRoutes = express.Router();

const upload = multer({storage: multer.diskStorage({
    destination: 'uploads/img/previews',
    filename: async function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.params.id + file.originalname.match(/\.jpeg|\.jpg|\.png|\.gif/)[0])
    }
})});

postRoutes.post('/posts', checkAuth, upload.single('preview'), resizeImg, postValidation, handleValidationErrors, PostController.create)
postRoutes.delete('/posts/:id', checkAuth, PostController.remove)
postRoutes.put('/posts/:id', checkAuth, upload.single('preview'), resizeImg, PostController.update)
postRoutes.get('/posts', PostController.getAll)                 // posts?lastpost=2&limit=5
postRoutes.get('/posts/:id', PostController.getOne)
postRoutes.get('/posts/tags/all', PostController.getAllTags)    
postRoutes.get('/posts/tags/:tag', PostController.getPostsByTag)    // ?lastpost=2&limit=5

export default postRoutes;