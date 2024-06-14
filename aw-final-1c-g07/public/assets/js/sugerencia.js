import * as rest_api from "./modules/rest-api.mjs";
let emailAddress = "";

const searchUserHandler = async (event) => {
  event.preventDefault();
  try {
    // Realizar la petición a la API REST
    const response = await rest_api.searchClientById();
    const result = await response.json();

    //Tocaría pasar a la pagina de ver perfil
    emailAddress = result.emailAddress;

  } catch(error) {
    // Si ocurrió algún error, mostrar una alerta
    console.error(error);
    alert(error);
  }
};

const cancelar = (event) => {
  event.preventDefault();
  window.location.assign("../");
}

const enviarDatos =  async (event) =>{
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    const sugerencia = document.getElementById('sugerenciaText').value;

    let data = {
        email: emailAddress,
        mensaje: sugerencia
    }

    try{
        //Envaimos los datos al servidor
        const response = await rest_api.createSuggestion(data);
      document.getElementById("sugerenciaText").value = "";
    }catch(error){
      console.error("ERROR Sugerencia: " + error)
    }
}

const cargarSugerencias = async () => {
  try{
      const response = await rest_api.getSuggestions();
      const sugerencias = await response.json();

      // Obtener el contenedor de tarjetas
      const cardContainer = document.getElementById('cardContainer');
      // Limpiamos el contenedor
      cardContainer.innerHTML = '';

      sugerencias.forEach(sugerencia => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
              <div class="card">
                  <p>Sugerencia  de: ${sugerencia.email}</p>
                  <p>Mensaje: ${sugerencia.mensaje}</p>
                  <button onclick="eliminarSugerencia('${sugerencia.email}', '${sugerencia.mensaje}')">Eliminar Sugerencia</button>
              </div>
          `;
          cardContainer.appendChild(card);
      });
  }catch(error){
      console.error('Error al cargar los mensajes:', error);
  }
}

async function eliminarSugerencia(correo, mensaje){
  const data = { //Datos de la sugerencia a borrar
      email: correo,
      mensaje: mensaje
  }

  try{
    const respuesta = await rest_api.removeSuggestion(data);

    if(respuesta.ok){ //Recargar página después del borrado
      location.reload();
    }

  }catch(error){
    console.error("ERROR: " + error);
  }  
}

document.addEventListener("DOMContentLoaded",searchUserHandler);
document.getElementById("cancelar").addEventListener("click", cancelar);
document.getElementById("sugerencia").addEventListener("click", enviarDatos);