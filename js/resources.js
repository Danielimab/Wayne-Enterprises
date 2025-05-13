        document.addEventListener('DOMContentLoaded', () => {
            const resourceForm = document.getElementById('resourceForm');
            const resourceTableBody = document.getElementById('resourceTableBody');
            const submitButton = document.getElementById('submitButton');
            let isEditMode = false;

            loadResources();

            resourceForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const resourceId = document.getElementById('resourceId').value;
                const name = document.getElementById('name').value;
                const type = document.getElementById('type').value;
                const quantity = document.getElementById('quantity').value;
                const location = document.getElementById('location').value;

                const resourceData = { name, type, quantity, location };

                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (!user) {
                        alert('Usuário não autenticado. Redirecionando para a página de login.');
                        window.location.href = 'login.html';
                        return;
                    }

                    let response;
                    if (isEditMode) {
                        resourceData.id = resourceId;
                        response = await fetch('http://localhost:3000/api/resources/update', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.id
                            },
                            body: JSON.stringify(resourceData)
                        });
                    } else {
                        response = await fetch('http://localhost:3000/api/resources/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.id
                            },
                            body: JSON.stringify(resourceData)
                        });
                    }

                    if (!response.ok) {
                        throw new Error('Erro ao salvar recurso');
                    }

                    alert('Recurso salvo com sucesso!');
                    resetForm();
                    loadResources();
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao salvar recurso. Tente novamente.');
                }
            });

            async function loadResources() {
                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (!user) {
                        alert('Usuário não autenticado. Redirecionando para a página de login.');
                        window.location.href = 'login.html';
                        return;
                    }

                    const response = await fetch('http://localhost:3000/api/resources', {
                        headers: {
                            'Authorization': user.id
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao carregar recursos');
                    }

                    const resources = await response.json();
                    renderResources(resources);
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao carregar recursos. Tente novamente.');
                }
            }

            function renderResources(resources) {
                resourceTableBody.innerHTML = '';
                resources.forEach(resource => {
                    const row = document.createElement('tr');
                    row.innerHTML = ` 
                        <td>${resource.id}</td>
                        <td>${resource.name}</td>
                        <td>${resource.type}</td>
                        <td>${resource.quantity}</td>
                        <td>${resource.location}</td>
                        <td class="actions">
                            <button onclick="editResource(${resource.id})">Editar</button>
                            <button onclick="deleteResource(${resource.id})">Excluir</button>
                        </td>
                    `;
                    resourceTableBody.appendChild(row);
                });
            }

            window.editResource = async (id) => {
                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (!user) {
                        alert('Usuário não autenticado. Redirecionando para a página de login.');
                        window.location.href = 'login.html';
                        return;
                    }

                    const response = await fetch(`http://localhost:3000/api/resources/resource?id=${id}`, {
                        headers: {
                            'Authorization': user.id
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao carregar recurso');
                    }

                    const resource = await response.json();
                    document.getElementById('resourceId').value = resource.id;
                    document.getElementById('name').value = resource.name;
                    document.getElementById('type').value = resource.type;
                    document.getElementById('quantity').value = resource.quantity;
                    document.getElementById('location').value = resource.location;
                    submitButton.textContent = 'Atualizar Recurso';
                    isEditMode = true;
                } catch (error) {
                    console.error('Erro:', error);
                         alert('Erro ao carregar recurso. Tente novamente.');
                }
            };

            window.deleteResource = async (id) => {
                if (confirm('Tem certeza que deseja excluir este recurso?')) {
                    try {
                        const user = JSON.parse(localStorage.getItem('user'));
                        if (!user) {
                            alert('Usuário não autenticado. Redirecionando para a página de login.');
                            window.location.href = 'login.html';
                            return;
                        }

                        const response = await fetch('http://localhost:3000/api/resources/delete', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.id
                            },
                            body: JSON.stringify({ id })
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao excluir recurso');
                        }

                        alert('Recurso excluído com sucesso!');
                        loadResources();
                    } catch (error) {
                        console.error('Erro:', error);
                        alert('Erro ao excluir recurso. Tente novamente.');
                    }
                }
            };

            function resetForm() {
                resourceForm.reset();
                document.getElementById('resourceId').value = '';
                submitButton.textContent = 'Adicionar Recurso';
                isEditMode = false;
            }
        });