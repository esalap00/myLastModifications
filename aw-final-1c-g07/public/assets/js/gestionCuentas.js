import * as rest_api from "./modules/rest-api.mjs";

document.addEventListener('DOMContentLoaded', async function() {
  let response = await rest_api.getClients();
  let data_users = await response.json();
  const usersTableBody = document.querySelector('#usersTable tbody');
  
  function renderTable() {
      usersTableBody.innerHTML = '';
      data_users.forEach(user => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = user.nameUser;
          row.appendChild(nameCell);

          const actionsCell = document.createElement('td');
          const createAdminButton = document.createElement('button');
          createAdminButton.textContent = 'Crear como Admin';
          createAdminButton.classList.add('create-admin');
          createAdminButton.addEventListener('click', () => createAdmin(user));
          actionsCell.appendChild(createAdminButton);

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.classList.add('delete-user');
          deleteButton.addEventListener('click', () => deleteUser(user.emailAddress));
          actionsCell.appendChild(deleteButton);

          row.appendChild(actionsCell);

          usersTableBody.appendChild(row);
      });
  }
  
  async function createAdmin(usuario) {
      const dialogo = confirm(`¿Seguro que quieres actualizar la cuenta a administrador al usuario: ${usuario.nameUser}?`) 
      if(dialogo){
        const data = {
          nameUser: usuario.nameUser,
          lastNameUser: usuario.lastNameUser,
          emailAddress: usuario.emailAddress,
          rolUser: "admin",
          userName: usuario.userName
        }
                   
        const response = await rest_api.updateUser(usuario._id, data);

        if(response.ok){
          location.reload();
        }
      }
  }

  async function deleteUser(email) { 
    const dialogo = confirm("¿Seguro que quieres eliminar este usuario?") 
    if(dialogo){
      const data = {
        emailAddress: email
      }

      const res = await rest_api.deleteUser(data);
  
      if(res.ok){
        response = await rest_api.getClients();
        data_users = await response.json();
        renderTable();
      }
    }
  }

  renderTable();
});

const cancelar = (event) => {
  window.location.assign("../");
}

document.getElementById("vuelta").addEventListener("click", cancelar);
