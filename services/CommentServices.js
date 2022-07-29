import CommentModel from '../models/CommentModel.js';
import PostModel from '../models/PostModel.js';
import removePassword from '../utils/removePasswordFromDoc.js';

export const create = async (req) => {
    const docComment = new CommentModel({
        text: req.body.text,
        author: req.userId,
        post: req.params.postId
    });

    const docPost = await PostModel.findById(req.params.postId);
    docPost.commentCount++;
    await docPost.save();
    
    let post = (await docComment.save())._doc;

    return post;
}

export const remove = async (req) => {
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
        return ({
            message: `Данного комментария нет в базе`
        })
    }

    const docPost = await PostModel.findById(comment.post.toString());
    docPost.commentCount--;
    await docPost.save();

    await CommentModel.deleteOne({_id: req.params.id})

    return ({
        success: `Комментарий id=${req.params.id} удален`
    })
}

export const getCommentsByPostId = async (req) => {
    const comments = await CommentModel.find({post: req.params.postId}).sort({createdAt: -1}).populate('author');

    if (comments.length === 0) {
        return ({
            message: `Комментариев к данной статье пока нет`
        })
    }

    return comments;
}

export const getAll = async (req) => {
    const comments = await CommentModel.find().sort({createdAt: -1}).limit(req.query.limit).populate('author');

    if (comments.length === 0) {
        return ({
            message: `Комментариев к данной статье пока нет`
        })
    }

    return comments;
}