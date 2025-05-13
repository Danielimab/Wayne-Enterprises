-- Tabela de Usuários
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('employee', 'manager', 'security_admin'))
);

-- Tabela de Recursos
CREATE TABLE resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    location TEXT NOT NULL
);

-- Inserir usuários
INSERT INTO users (username, password, role) VALUES 
('Bruce Wayne', 'senha123', 'security_admin'),
('Alfred Pennyworth', 'senha456', 'manager'),
('Lucius Fox', 'senha789', 'employee');

-- Inserir recursos
INSERT INTO resources (name, type, quantity, location) VALUES 
('Câmera de Segurança 1', 'camera', 1, 'Entrada Principal'),
('Carro Blindado', 'veiculo', 1, 'Garagem'),
('Sensor de Movimento', 'sensor', 5, 'Corredor A');

SELECT * FROM users;




