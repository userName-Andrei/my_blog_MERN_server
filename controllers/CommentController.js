import { CommentServices } from "../services/index.js";

export const create = async (req, res) => {
    try {
        const comment = await CommentServices.create(req);

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const comment = await CommentServices.remove(req);

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось удалить комментарий'
        })
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await CommentServices.getCommentsByPostId(req);

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить комментарии'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const comments = await CommentServices.getAll(req);

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить комментарии'
        })
    }
}