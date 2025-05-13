        document.addEventListener('DOMContentLoaded', () => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                alert('Usuário não autenticado. Redirecionando para a página de login.');
                window.location.href = 'login.html';
                return;
            }

            function renderAccessButtons(role) {
                let buttons = '';

                buttons += `<a href="dashboard.html">Dashboard</a>`;

                if (role === 'manager' || role === 'security_admin') {
                    buttons += `<a href="resources.html">Recursos</a>`;
                }

                if (role === 'security_admin' || role === 'manager') {
                    buttons += `<a href="cadastro.html">Cadastrar Funcionário</a>`;
                }

                document.getElementById('accessButtons').innerHTML = buttons;
            }

            renderAccessButtons(user.role);
        });

        function logout() {
            localStorage.removeItem('user'); 
            window.location.href = 'login.html'; 
        }