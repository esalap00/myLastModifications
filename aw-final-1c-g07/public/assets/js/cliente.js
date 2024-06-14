import * as rest_api from "./modules/rest-api.mjs";
import * as html  from './modules/html-components.mjs';
import * as db  from './modules/dataBase.mjs';

const verPerfilHandler = async (event) => {
    //Tocaría pasar a la pagina de ver perfil
  window.location.assign("./perfil");
  
};

const verSugerenciasHandler = async (event) => {
    //Tocaría pasar a la pagina de ver perfil
  window.location.assign("./sugerencias");
  
};

// Handler para cerrar la sesión
const logoutHandler = async (event) => {
  
  event.preventDefault();
  if (confirm("¿Quieres cerrar la sesión?")) {
    try {
      
      const response = await rest_api.logoutUser();

      if(!response.ok){
        throw new Error(response.message);
      }
      // Notificar al usuario de que todo ha ido correctamente
      alert(`Sesión cerrada correctamente.`);

      // Redirección al login
      window.location.assign("/");
    } catch(error) {
      
      console.error(error.message);
      alert(`Ha ocurrido un error: ${error.message}`);
    }
  }
};


const clickHandle = async (event) => {
    let carro = document.getElementById("carro");

    // si esta oculto 
    if(carro.style.display === "none" || !carro.style.display){
      // lo mostramos
      carro.style.display = "block";
    }else{
      // sino
      // lo ocultamos
      carro.style.display = "none";
    }
};

/////////////////////////////////////////////////
const searchCardHandler = (event) => {
  
  event.preventDefault();

  // Obtener los datos del formulario.
  let dato = event.target;
  let busquedaCarton = dato.elements['name'].value;

  // Realizar la búsqueda en la base de datos
  const results = db.searchCardByName(busquedaCarton);

  // Actualizar el apartado de los resultados
  html.updateCardElements(results);

};

const showOrders = async (event) => {
  
  window.location.assign("./verPedidos");
};


db.fetchData();

document.forms['yugioh-search'].addEventListener('submit', searchCardHandler);

document.getElementById("perfilUser").addEventListener("click",verPerfilHandler);
document.getElementById("cerrarSesion").addEventListener("click", logoutHandler);
document.getElementById("carroCompra").addEventListener("click", clickHandle);
document.getElementById("verPedidos").addEventListener("click", showOrders);
document.getElementById("sugerencia").addEventListener("click", verSugerenciasHandler);
