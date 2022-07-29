import {body} from 'express-validator';
import UserModel from './models/UserModel.js';

export const userValidation = [
    body('email', 'Неверный формат почты')
        .isEmail()
        .custom(value => {
            return UserModel
                        .findOne({email: value})
                        .then(user => {
                            if (user) {
                                return Promise.reject('Введите другой email')
                            }
                        })
        }),
    body('name', 'Имя должно быть больше 2 символов').isLength({min: 2}).escape().trim(),
    body('password', 'Пароль должен содержать цифры и быть более 5 символов')
        .escape()
        .isLength({ min: 5 })
        .matches(/\d/)
]

export const postValidation = [
    body('title', 'Введите не менее 3 символов').isLength({min: 3}).trim().escape(),
    body('text', 'Введите не менее 10 символов').isLength({min: 10}).trim().escape()
]

export const commentValidation = [
    body('text', 'Введите комментарий').trim().not().isEmpty().escape()
]