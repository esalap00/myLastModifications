import * as rest_api from "./modules/rest-api.mjs";


const searchUserHandler = async (event) => {
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();

  // Obtener los datos del formulario
  const searchForm = document.getElementsByName("user-profile")[0];

  try {
    // Realizar la petición a la API REST
    const response = await rest_api.searchClientById();
    const result = await response.json();

    //Tocaría pasar a la pagina de ver perfil
    searchForm.elements["nameUser"].value = result.nameUser;
    searchForm.elements["lastNameUser"].value = result.lastNameUser;
    searchForm.elements["userName"].value = result.userName;
    searchForm.elements["emailAddress"].value = result.emailAddress;
    searchForm.elements["rolUser"].value = result.rolUser;


  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    console.error(error);
    alert(error);
  }
};

const actualizarUsuarioHandler = async(event) =>{
  event.preventDefault();

  const searchForm = document.getElementsByName("user-profile")[0];

  const response = await rest_api.searchClientById();
  const result = await response.json();

  const setUp = {
    nameUser:searchForm.elements["nameUser"].value,
    lastNameUser:searchForm.elements["lastNameUser"].value,
    userName:searchForm.elements["userName"].value,
    emailAddress:searchForm.elements["emailAddress"].value,
    rolUser:searchForm.elements["rolUser"].value,
  };

  rest_api.updateUser(result._id, setUp);

  window.location.assign("../");
};


const cancelHandler = async(event) =>{

  window.location.assign("../");
};

const darBajaHandler = async (event) => {
  
  event.preventDefault();
  if (confirm("¿Quieres darte de baja?")) {
    try {

      const response = await rest_api.deleteUser();

      if(!response.ok){
        throw new Error(response.message);
      }
      // Notificar al usuario de que todo ha ido correctamente
      alert(`Cuenta eliminada correctamente.`);
      // Redirección al login
      window.location.assign("/");
    } catch(error) {
      
      console.error(error.message);
      alert(`Ha ocurrido un error: ${error.message}`);
    }
  }
};


document.addEventListener("DOMContentLoaded",searchUserHandler);
document.getElementById("Actualizar").addEventListener("click",actualizarUsuarioHandler);
document.getElementById("Cancelar").addEventListener("click",cancelHandler);
document.getElementById("darBaja").addEventListener("click", darBajaHandler);

