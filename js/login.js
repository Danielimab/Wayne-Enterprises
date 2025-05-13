        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');

            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault(); 

                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch('http://localhost:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    });

                    if (!response.ok) {
                        throw new Error('Credenciais inválidas');
                    }

                    const data = await response.json();
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login bem-sucedido!');
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao fazer login. Verifique suas credenciais.');
                }
            });
        });