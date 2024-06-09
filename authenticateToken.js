const jwt = require('jsonwebtoken');
const secret = require('./secret.js');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token inválido.' });
    }
}

module.exports = authenticateToken;
