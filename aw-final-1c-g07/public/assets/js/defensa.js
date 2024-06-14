import * as rest_api from "./modules/rest-api.mjs";
import * as html from "./modules/html-components.mjs";


const showDefensa = async () => {
    try {
      // Realizar petición a la API REST
      const response = await rest_api.getAll();
      const result = await response.json();
      // Si el usuario no ha sido identificado correctamente
      if (!response.ok) {
        throw new Error(result.message);
      }
      // Mostrar los pedidos
      html.mostrarDatosDefensa(result, showDefensa);
    } catch (error) {
      console.error(error);
      alert(error);
    }
}

// Añadir defensa
const addDefensa = async () => {
    try {
      // Obtener los datos del formulario
      const datos = document.getElementById("datos").value;
      const nombre = document.getElementById("nombre").value;
      const nacimiento = document.getElementById("nacimiento").value;

  
      // Realizar petición a la API REST
      const response = await rest_api.postDefensa({ datos, nombre, nacimiento });
      const result = await response.json();
  
      // Si el usuario no ha sido identificado correctamente
      if (!response.ok) {
        throw new Error(result.message);
      }
      document.getElementById("formData").reset();
      // Mostrar los pedidos
      showDefensa();
    } catch (error) {
      console.error(error);
      alert(error);
    }
}


document.getElementById("anadir").addEventListener("click", () => {
    // Añadir defensa
    addDefensa();
  });
document.getElementById("volcar").addEventListener("click", ()=>{showDefensa()})
  