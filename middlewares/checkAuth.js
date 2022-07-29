import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/gi, '');

    if (!token) {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }

    try {
        const decoded = jwt.verify(token, 'salt123');

        req.userId = decoded._id;

        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message: 'Нет доступа'
        })
    }
}

export default checkAuth;