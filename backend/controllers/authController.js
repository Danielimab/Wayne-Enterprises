const db = require('../config/db');

exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.get(query, [username, password], (err, user) => {
        if (err) {
            console.error('Erro no banco de dados:', err.message);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        res.json({ message: 'Login bem-sucedido', user });
    });
};

exports.cadastrarUsuario = (req, res) => {
    const { username, password, role } = req.body;

    // Verifica se o usuário já existe
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.get(checkQuery, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar usuário' });
        }
        if (user) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Insere o novo usuário
        const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.run(insertQuery, [username, password, role], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }
            res.json({ message: 'Usuário cadastrado com sucesso', id: this.lastID });
        });
    });
};

exports.listarFuncionarios = (req, res) => {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, funcionarios) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar funcionários' });
        }
        res.json(funcionarios);
    });
};

exports.excluirFuncionario = (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM users WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Erro ao excluir funcionário:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir funcionário' });
        }
        res.json({ changes: this.changes });
    });
};