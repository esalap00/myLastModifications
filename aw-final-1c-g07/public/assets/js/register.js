// Cargar módulos
import * as rest_api from "./modules/rest-api.mjs";

/**
 * Crea un nuevo usuario según los datos del formulario de la página de registro
 * y muestra una alerta al usuario.
 *
 * @param {Event} event Información del evento que ha sucedido.
 */
const createUserHandler = async (event) => {
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();

  // Crear un nuevo FormData para enviar todos los datos del formulario
  const userData = new FormData(document.forms["form-register"]);

  try {
    // Realizar la petición a la API REST
    const response = await rest_api.createUser(userData);
    const result = await response.json();

    if(!response.ok){
      throw new Error(result.message);
    }
      
    // Notificar al usuario de que todo ha ido correctamente
    alert(`Usuario creado correctamente.`);
    
    // Reiniciar los campos del formulario
    document.forms["form-register"].reset();

    window.location.assign("/");
    
  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    console.error(error.message);
    alert(`Ha ocurrido un error al registrar el usuario: ${error.message}`);
  }
};

// Manejador al formulario de crear un usuario
document.forms["form-register"].addEventListener("submit", createUserHandler);