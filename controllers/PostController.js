import { PostServices } from "../services/index.js";

export const create = async (req, res) => {
    try {
        const post = await PostServices.create(req);

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostServices.getAll(req);

        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось загрузить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const post = await PostServices.getOne(req);

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось загрузить статью'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const post = await PostServices.remove(req);

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось удалить статью'
        })
    }
}

export const update = async (req, res) => {
    try {
        const post = await PostServices.update(req);

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}

export const getPostsByTag = async (req, res) => {
    try {
        const posts = await PostServices.getPostsByTag(req);

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Не удалось загрузить статьи по тэгу - ${req.params.tag}`
        })
    }
}