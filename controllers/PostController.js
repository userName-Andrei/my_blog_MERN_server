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

        if (posts.message) {
            return res.status(404).json(posts)
        }

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

        if (post.message) {
            return res.status(404).json(post)
        }

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

        if (post.message) {
            return res.status(403).json(post)
        }

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

        if (post.message) {
            return res.status(403).json(post)
        }

        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}

export const getAllTags = async (req, res) => {
    try {
        const tags = await PostServices.getAllTags();

        if (tags.message) {
            return res.status(404).json(tags)
        }

        res.json(tags)
    } catch {
        console.log(error)
        res.status(500).json({
            message: `Не удалось загрузить все теги`
        })
    }
}

export const getPostsByTag = async (req, res) => {
    try {
        const posts = await PostServices.getPostsByTag(req);

        if (posts.message) {
            return res.status(404).json(posts)
        }

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Не удалось загрузить статьи по тэгу - ${req.params.tag}`
        })
    }
}