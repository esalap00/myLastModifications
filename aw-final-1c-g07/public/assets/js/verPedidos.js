import * as rest_api from "./modules/rest-api.mjs";
import * as html from "./modules/html-components.mjs";

const verPerfilHandler = async (event) => {
  //Tocaría pasar a la pagina de ver perfil
window.location.assign("../perfil");

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


//crear función que muestre la vista de pedidos de html
const showOrders = async () => {
  try {
    // Realizar petición a la API REST
    const response = await rest_api.searchClientById();
    const result = await response.json();
    // Si el usuario no ha sido identificado correctamente
    if (!response.ok) {
      throw new Error(result.message);
    }

    let data = await rest_api.showOrders().then(r => r.json());

    data = data.filter(order => order.buyer === result._id);

    // Mostrar los pedidos
    html.showOrders(data);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar los pedidos
  showOrders();
});

document.getElementById("inicioUser").addEventListener("click", () => {
  window.location.assign("../");
});

document.getElementById("perfilUser").addEventListener("click",verPerfilHandler);
document.getElementById("cerrarSesion").addEventListener("click", logoutHandler);
  