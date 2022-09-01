import PostModel from '../models/PostModel.js';
import CommentModel from '../models/CommentModel.js';
import removePassword from '../utils/removePasswordFromDoc.js';

export const create = async (req) => {
    const {title, text, tags} = req.body;

    const doc = new PostModel({
        title,
        text,
        author: req.userId,
        previewUrl: req.file ? `${process.env.HOST + req.file.fieldname}/${req.file.filename}` : process.env.HOST + 'preview/default.jpg',
        tags: tags.split(',').map(tag => tag.trim())
    });

    const post = await doc.save();

    return post;
}

export const getAll = async (req) => {
    const queryes = req.query;
    const perPage = queryes.limit || 5;
    const count = await PostModel.countDocuments({});
    const posts = await PostModel.find().sort({createdAt: -1}).limit(perPage).skip(queryes.lastpost).populate('author');

    if (count === 0) {
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

    const post = await PostModel.findOneAndUpdate(
        {_id: req.params.id},
        {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(',').map(tag => tag.trim()),
            previewUrl: req.file ? `${process.env.HOST + req.file.fieldname}/${req.file.filename}` : process.env.HOST + 'preview/default.jpg',
            author: req.userId,
        },
        {new: true}
    )

    return post;
}

export const getAllTags = async () => {
    let tags = await PostModel.find({}, 'tags').sort({createdAt: -1});

    if (!tags) {
        return ({
            message: 'Статей пока нет.'
        });
    }

    tags = tags.map(obj => obj.tags.join(' ')).join(' ').trim().split(' ');

    return Array.from(new Set(tags));
}

export const getPostsByTag = async (req) => {
    const queryes = req.query;
    const perPage = queryes.limit || 5;
    const count = await PostModel.countDocuments({});
    const posts = await PostModel.find({tags: req.params.tag})
                                 .sort({createdAt: -1})
                                 .limit(perPage)
                                 .skip(queryes.lastpost)
                                 .populate('author');

    if (count === 0) {
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