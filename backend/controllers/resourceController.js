const db = require('../config/db');

exports.getResources = (req, res) => {
    const query = 'SELECT * FROM resources';
    db.all(query, [], (err, resources) => {
        if (err) {
            console.error('Erro ao buscar recursos:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar recursos' });
        }
        res.json(resources);
    });
};

exports.getResourceById = (req, res) => {
    const { id } = req.query; 
    const query = 'SELECT * FROM resources WHERE id = ?';
    db.get(query, [id], (err, resource) => {
        if (err) {
            console.error('Erro ao buscar recurso:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar recurso' });
        }
        if (!resource) {
            return res.status(404).json({ error: 'Recurso não encontrado' });
        }
        res.json(resource);
    });
};


exports.addResource = (req, res) => {
    const { name, type, quantity, location } = req.body;
    const query = 'INSERT INTO resources (name, type, quantity, location) VALUES (?, ?, ?, ?)';
    db.run(query, [name, type, quantity, location], function(err) {
        if (err) {
            console.error('Erro ao adicionar recurso:', err.message);
            return res.status(500).json({ error: 'Erro ao adicionar recurso' });
        }
        res.json({ id: this.lastID });
    });
};

exports.updateResource = (req, res) => {
    const { id, name, type, quantity, location } = req.body;
    const query = 'UPDATE resources SET name = ?, type = ?, quantity = ?, location = ? WHERE id = ?';
    db.run(query, [name, type, quantity, location, id], function(err) {
        if (err) {
            console.error('Erro ao atualizar recurso:', err.message);
            return res.status(500).json({ error: 'Erro ao atualizar recurso' });
        }
        res.json({ changes: this.changes });
    });
};

exports.deleteResource = (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM resources WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Erro ao excluir recurso:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir recurso' });
        }
        res.json({ changes: this.changes });
    });
};

exports.cadastrarUsuario = (req, res) => {
    const { username, password, role } = req.body;

    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.get(checkQuery, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar usuário' });
        }
        if (user) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.run(insertQuery, [username, password, role], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }
            res.json({ message: 'Usuário cadastrado com sucesso', id: this.lastID });
        });
    });
};