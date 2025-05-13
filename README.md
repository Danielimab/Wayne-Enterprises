Documentação do Projeto Wayne Industries
Visão Geral
O projeto Wayne Industries é uma aplicação web desenvolvida para gerenciar recursos e usuários de uma empresa fictícia chamada Wayne Industries. A aplicação consiste em um backend construído com Node.js, Express e SQLite, e um frontend desenvolvido com HTML, CSS e JavaScript. A aplicação permite o gerenciamento de recursos (como câmeras de segurança, veículos e sensores) e usuários (funcionários, gerentes e administradores de segurança).

Estrutura do Projeto
Backend
/backend/config/db.js: Configuração da conexão com o banco de dados SQLite.

/backend/controllers/: Controllers que lidam com a lógica de negócio da aplicação.

authController.js: Lida com autenticação, cadastro de usuários, listagem de funcionários e exclusão de funcionários.

dashboardController.js: Fornece dados para o dashboard.

resourceController.js: Gerencia operações CRUD para recursos.

/backend/middleware/: Middlewares para autenticação e autorização.

authMiddleware.js: Verifica se o usuário está autenticado.

/backend/routes/: Define as rotas da aplicação.

authRoutes.js: Rotas para autenticação, cadastro de usuários, listagem de funcionários e exclusão de funcionários.

dashboardRoutes.js: Rotas para o dashboard.

resourceRoutes.js: Rotas para gerenciamento de recursos.

/backend/app.js: Configuração do servidor Express e middleware.

/backend/server.js: Inicializa o servidor.

/backend/database/: Contém o script SQL para criar as tabelas e inserir dados iniciais.

Frontend
/backend/frontend/views/: Páginas HTML da aplicação.

cadastro.html: Página para cadastrar novos usuários e listar funcionários.

dashboard.html: Página do dashboard que exibe dados dos recursos e usuários.

index.html: Página inicial com links para outras páginas baseados no nível de acesso do usuário.

login.html: Página de login.

resources.html: Página para gerenciar recursos.

Funcionalidades
Autenticação e Autorização
Login: Os usuários podem fazer login fornecendo um nome de usuário e senha. O sistema verifica as credenciais no banco de dados e, se válidas, armazena o usuário no localStorage para autenticação subsequente.

Cadastro de Usuários: Apenas usuários com permissão (gerentes e administradores de segurança) podem cadastrar novos usuários. O sistema verifica se o nome de usuário já existe antes de criar um novo usuário.

Middleware de Autenticação: Todas as rotas protegidas verificam se o usuário está autenticado antes de permitir o acesso.

Gerenciamento de Recursos
Listar Recursos: Exibe todos os recursos cadastrados no banco de dados.

Adicionar Recurso: Permite adicionar um novo recurso ao sistema.

Editar Recurso: Permite editar os detalhes de um recurso existente.

Excluir Recurso: Permite excluir um recurso do sistema.

Gerenciamento de Usuários
Listar Funcionários: Exibe todos os funcionários cadastrados no sistema. A lista é oculta inicialmente e pode ser exibida ao clicar no botão "Listar Funcionários".

Excluir Funcionário: Permite excluir um funcionário do sistema. Cada funcionário listado tem um botão "Excluir" que remove o usuário do banco de dados.

Dashboard
Visualização de Dados: Exibe uma visão geral dos recursos e usuários cadastrados no sistema.

Banco de Dados
O banco de dados SQLite é utilizado para armazenar os dados da aplicação. As tabelas são criadas com o seguinte esquema:

Tabela users
id: Identificador único do usuário (chave primária).

username: Nome de usuário (único).

password: Senha do usuário.

role: Papel do usuário (employee, manager, security_admin).

Tabela resources
id: Identificador único do recurso (chave primária).

name: Nome do recurso.

type: Tipo do recurso (ex: câmera, veículo, sensor).

quantity: Quantidade disponível.

location: Localização do recurso.

Configuração do Projeto
Backend
Instalação das Dependências:

cd backend
npm install
Inicialização do Banco de Dados:

Execute o script SQL localizado em /backend/database/ para criar as tabelas e inserir dados iniciais.

Execução do Servidor:
node app.js
O servidor estará disponível em http://localhost:3000.

Frontend
Acesso às Páginas:

Abra as páginas HTML localizadas em /backend/frontend/ em um navegador web.

Certifique-se de que o servidor backend está em execução para que as requisições AJAX funcionem corretamente.

Fluxo de Trabalho
Login:

O usuário acessa a página de login (login.html) e insere suas credenciais.

Após o login bem-sucedido, o usuário é redirecionado para a página inicial (index.html).

Navegação:

Na página inicial, o usuário vê botões de acesso baseados em seu nível de acesso (funcionário, gerente, administrador de segurança).

O usuário pode acessar o dashboard, gerenciar recursos ou cadastrar novos usuários, dependendo de suas permissões.

Gerenciamento de Recursos:

Na página de recursos (resources.html), o usuário pode adicionar, editar ou excluir recursos.

As alterações são refletidas no banco de dados e atualizadas na interface do usuário.

Gerenciamento de Usuários:

Na página de cadastro (cadastro.html), o usuário pode cadastrar novos funcionários e listar os funcionários existentes.

Cada funcionário listado tem um botão "Excluir" para remover o usuário do sistema.

Dashboard:

O dashboard (dashboard.html) exibe uma visão geral dos recursos e usuários cadastrados no sistema.

Considerações de Segurança
Autenticação: Todas as rotas protegidas exigem autenticação. O token de autenticação é armazenado no localStorage e enviado no cabeçalho das requisições.

Autorização: Apenas usuários com permissões específicas podem acessar certas funcionalidades, como cadastrar novos usuários ou gerenciar recursos.

Senhas: As senhas são armazenadas em texto plano no banco de dados. Recomenda-se utilizar técnicas de hash (como bcrypt) para armazenar senhas de forma segura em um ambiente de produção.

Melhorias Futuras
Hash de Senhas: Implementar hash de senhas para aumentar a segurança.

Validação de Entrada: Adicionar validação de entrada no frontend e backend para evitar injeção de SQL e outros ataques.

Interface de Usuário: Melhorar a interface do usuário com frameworks como Bootstrap ou Materialize.

Testes: Implementar testes automatizados para garantir a qualidade do código.

Paginação: Adicionar paginação para listas grandes de recursos e usuários.

Filtros e Busca: Implementar filtros e busca para facilitar a localização de recursos e usuários.

Conclusão
O projeto Wayne Industries é uma aplicação web completa que demonstra o uso de Node.js, Express, SQLite e HTML/CSS/JavaScript para criar uma solução de gerenciamento de recursos e usuários. A aplicação é modular, segura e fácil de expandir com novas funcionalidades. Com as novas funcionalidades de listagem e exclusão de funcionários, o sistema agora oferece um gerenciamento mais completo e eficiente.