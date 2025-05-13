        document.addEventListener('DOMContentLoaded', () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert('Usuário não autenticado. Redirecionando para a página de login.');
                window.location.href = 'index.html';
                return;
            }
    
            async function loadDashboardData() {
                try {
                    const response = await fetch('http://localhost:3000/api/dashboard/data', {
                        headers: {
                            'Authorization': user.id
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error('Erro ao carregar dados do dashboard');
                    }
    
                    const data = await response.json();
    
                    if (data.resources && Array.isArray(data.resources)) {
                        renderResources(data.resources);
                    } else {
                        console.error('Recursos não encontrados ou formato inválido:', data.resources);
                    }
    
                    if (data.users && Array.isArray(data.users)) {
                        renderUsers(data.users);
                    } else {
                        console.error('Usuários não encontrados ou formato inválido:', data.users);
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao carregar dados do dashboard.');
                }
            }
    
            function renderResources(resources) {
                const resourcesTableBody = document.getElementById('resourcesTableBody');
                resourcesTableBody.innerHTML = '';
                resources.forEach(resource => {
                    const row = document.createElement('tr');
                    row.innerHTML =`  
                        <td>${resource.id}</td>
                        <td>${resource.name}</td>
                        <td>${resource.type}</td>
                        <td>${resource.quantity}</td>
                        <td>${resource.location}</td>
                    `;
                    resourcesTableBody.appendChild(row);
                });
            }
    
            function renderUsers(users) {
                const usersTableBody = document.getElementById('usersTableBody');
                usersTableBody.innerHTML = '';
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML =`  
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                    `;
                    usersTableBody.appendChild(row);
                });
            }
    
            loadDashboardData();
        });