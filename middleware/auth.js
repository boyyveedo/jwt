const jwt = require('jsonwebtoken');

const authLogin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "token not provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, id } = decoded
        req.user = { username, id }// Attach decoded user information to req.user
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
};

module.exports = authLogin;
