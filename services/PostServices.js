import PostModel from '../models/PostModel.js';
import CommentModel from '../models/CommentModel.js';
import removePassword from '../utils/removePasswordFromDoc.js';

export const create = async (req) => {
    const {title, text, previewUrl, tags} = req.body;

    const doc = new PostModel({
        title,
        text,
        author: req.userId,
        previewUrl,
        tags
    });

    const post = await doc.save();

    return post;
}

export const getAll = async (req) => {
    const queryes = req.query;
    const perPage = queryes.limit || 5;
    const posts = await PostModel.find().sort({createdAt: -1}).limit(perPage).skip(queryes.lastpost).populate('author');

    if (!posts) {
        return ({
            message: 'Статей пока нет...'
        })
    }

    const postWithoutAuthorPassword = posts.map(item => {
        return ({
            ...item._doc,
            author: removePassword(item._doc.author._doc)
        })
    })
    // удалить пароль из постов
    return postWithoutAuthorPassword;
}

export const getOne = async (req) => {
    const post = await PostModel.findById(req.params.id).populate('author');

    if (!post) {
        return ({
            message: 'Данная статья не найдена!'
        })
    }

    post.viewsCount++;
    post.save();

    const postWithoutPassword = {...post._doc, author: removePassword(post._doc.author._doc)}

    return postWithoutPassword;
}

export const remove = async (req) => {
    let post = await PostModel.findById(req.params.id);

    if (post.author.toString() !== req.userId) {
        return ({
            message: 'Статью может удалить только автор!'
        })
    }

    if (!post) {
        return ({
            message: `Данная статья не найдена!`
        })
    }

    post = await PostModel.deleteOne({_id: req.params.id});

    await CommentModel.deleteMany({post: req.params.id})
    
    return ({
        success: `Статья c id=${req.params.id} удалена`
    })
}

export const update = async (req) => {
    const doc = await PostModel.findById(req.params.id);

    if (!doc) {
        return ({
            message: 'Данная статья не найдена!'
        })
    }

    if (doc.author.toString() !== req.userId) {
        return ({
            message: 'Статью может изменить только автор!'
        })
    }

    await PostModel.updateOne(
        {_id: req.params.id},
        {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            previewUrl: req.body.previewUrl,
            author: req.userId,
        }
    )

    return ({
        success: 'Статья успешно обновлена!'
    });
}

export const getPostsByTag = async (req) => {
    const posts = await PostModel.find({tags: req.params.tag}).populate('author');

    if (!posts) {
        return ({
            message: `Статьи по тегу "${req.params.tag}" не найдены`
        })
    } 
    
    const postsWithoutPassword = posts.map(item => {
        return ({
            ...item._doc,
            author: removePassword(item._doc.author._doc)
        })
    })

    return postsWithoutPassword;
}