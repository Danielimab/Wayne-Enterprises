const db = require('../config/db');

exports.getDashboardData = (req, res) => {
    const resourcesQuery = 'SELECT * FROM resources';
    const usersQuery = 'SELECT * FROM users';

    db.all(resourcesQuery, [], (err, resources) => {
        if (err) {
            console.error('Erro ao buscar recursos:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar recursos' });
        }

        db.all(usersQuery, [], (err, users) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err.message);
                return res.status(500).json({ error: 'Erro ao buscar usuários' });
            }

            res.json({ resources, users });
        });
    });
};