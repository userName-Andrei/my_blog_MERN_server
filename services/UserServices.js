import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/UserModel.js';
import removePassword from '../utils/removePasswordFromDoc.js';

export const register = async (req) => {
    const {name, password, email, avatarUrl} = req.body;

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        name,
        passwordHash: hash,
        email,
        avatarUrl
    })

    const userDoc = (await doc.save())._doc

    const token = jwt.sign(
        {_id: userDoc._id},
        'salt123',
        {expiresIn: '30d'}
    )

    const userWithouPass = removePassword(userDoc);

    return ({
        ...userWithouPass,
        token
    })
}

export const login = async (req) => {
    const {password, email} = req.body;
    const user = (await UserModel.findOne({email}))?._doc;

    if (!user) {
        return ({
            message: 'Неверный логин или пароль'
        })
    }

    const token = jwt.sign(
        {_id: user._id},
        'salt123',
        {expiresIn: '30d'}
    );

    const userWithouPass = removePassword(user);

    const decoded = await bcrypt.compare(password, user.passwordHash);
    
    if (!decoded) {
        return ({
            message: 'Неверный логин или пароль'
        })
    }

    return ({
        ...userWithouPass,
        token
    });
}

export const getMe = async (req) => {
    const user = (await UserModel.findById(req.userId))._doc;

    if (!user) {
        return ({
            message: 'Пользователь не найден!'
        })
    }

    const userWithouPass = removePassword(user);

    return userWithouPass;
}