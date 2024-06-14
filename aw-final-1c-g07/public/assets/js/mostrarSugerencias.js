import * as rest_api from "./modules/rest-api.mjs";

const cancelar = (event) => {
  window.location.assign("../");
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
                  <p class="email">Sugerencia  de: ${sugerencia.email}</p>
                  <p class="mensaje">Mensaje: ${sugerencia.mensaje}</p>
                  <button class="eliminar">Eliminar Sugerencia</button>
              </div>
          `;
          card.querySelector("button").addEventListener("click", eliminarSugerencia);
          card.dataset.email = sugerencia.email;
          card.dataset.mensaje = sugerencia.mensaje;
          cardContainer.appendChild(card);
      });
  }catch(error){
      console.error('Error al cargar los mensajes:', error);
  }
}

const eliminarSugerencia = async (event) => {
  let carta = event.target.parentNode.parentNode;
  let correo = carta.getElementsByClassName("email")[0];
  let mensaje = carta.getElementsByClassName("mensaje")[0];

  console.log(correo + " " + mensaje);

  let data = { //Datos de la sugerencia a borrar
      email: carta.dataset.email,
      mensaje: carta.dataset.mensaje
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

document.addEventListener("DOMContentLoaded", cargarSugerencias);
document.getElementById("vuelta").addEventListener("click", cancelar);