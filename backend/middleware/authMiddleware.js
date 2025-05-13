const db = require('../config/db');

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [token], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};