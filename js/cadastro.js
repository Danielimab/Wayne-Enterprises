        document.addEventListener('DOMContentLoaded', () => {
            const cadastroForm = document.getElementById('cadastroForm');
            const listarFuncionariosBtn = document.getElementById('listarFuncionariosBtn');
            const funcionariosList = document.getElementById('funcionariosList');
            const funcionariosTableBody = document.getElementById('funcionariosTableBody');

            // Função para carregar a lista de funcionários
            async function loadFuncionarios() {
                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (!user) {
                        alert('Usuário não autenticado. Redirecionando para a página de login.');
                        window.location.href = 'login.html';
                        return;
                    }

                    const response = await fetch('http://localhost:3000/api/auth/funcionarios', {
                        headers: {
                            'Authorization': user.id
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao carregar funcionários');
                    }

                    const funcionarios = await response.json();
                    renderFuncionarios(funcionarios);
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao carregar funcionários. Tente novamente.');
                }
            }

            // Função para renderizar a lista de funcionários
            function renderFuncionarios(funcionarios) {
                funcionariosTableBody.innerHTML = '';
                funcionarios.forEach(funcionario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `  
                        <td>${funcionario.id}</td>
                        <td>${funcionario.username}</td>
                        <td>${funcionario.role}</td>
                        <td class="actions">
                            <button onclick="excluirFuncionario(${funcionario.id})">Excluir</button>
                        </td>
                    `;
                    funcionariosTableBody.appendChild(row);
                });
            }

            // Função para excluir um funcionário
            window.excluirFuncionario = async (id) => {
                if (confirm('Tem certeza que deseja excluir este funcionário?')) {
                    try {
                        const user = JSON.parse(localStorage.getItem('user'));
                        if (!user) {
                            alert('Usuário não autenticado. Redirecionando para a página de login.');
                            window.location.href = 'login.html';
                            return;
                        }

                        const response = await fetch('http://localhost:3000/api/auth/excluir-funcionario', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.id
                            },
                            body: JSON.stringify({ id })
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao excluir funcionário');
                        }

                        alert('Funcionário excluído com sucesso!');
                        loadFuncionarios();
                    } catch (error) {
                        console.error('Erro:', error);
                        alert('Erro ao excluir funcionário. Tente novamente.');
                    }
                }
            };

            // Mostrar/ocultar a lista de funcionários
            listarFuncionariosBtn.addEventListener('click', () => {
                if (funcionariosList.style.display === 'none') {
                    funcionariosList.style.display = 'block';
                    loadFuncionarios();
                } else {
                    funcionariosList.style.display = 'none';
                }
            });

            // Cadastrar novo funcionário
            cadastroForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const role = document.getElementById('role').value;

                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (!user) {
                        alert('Usuário não autenticado. Redirecionando para a página de login.');
                        window.location.href = 'login.html';
                        return;
                    }

                    const response = await fetch('http://localhost:3000/api/auth/cadastrar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': user.id
                        },
                        body: JSON.stringify({ username, password, role })
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao cadastrar funcionário');
                    }

                    alert('Funcionário cadastrado com sucesso!');
                    cadastroForm.reset(); // Limpa o formulário
                    loadFuncionarios(); // Atualiza a lista de funcionários
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao cadastrar funcionário. Tente novamente.');
                }
            });
        });