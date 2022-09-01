import {UserServices} from '../services/index.js';

export const register = async (req, res) => {
    try {
        const user = await UserServices.register(req);

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Ошибка регистрации. Не удалось зарегистрироваться.'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserServices.login(req);

        if (user.message) {
            return res.status(401).json(user)
        }

        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Ошибка сравнения паролей.'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserServices.getMe(req);

        if (user.message) {
            return res.status(404).json(user)
        }

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message: 'Нет доступа!'
        })
    }
    
}