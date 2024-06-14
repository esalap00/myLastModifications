// Cargar módulos
import * as rest_api from "./modules/rest-api.mjs";

const loginHandler = async (event) => {
  
  event.preventDefault();
  
  const searchForm = new FormData(document.forms["form-login"]);
  try {
    // Realizar petición a la API REST
    const response = await rest_api.loginUser(searchForm);
    const result = await response.json();

    // Si el usuario no ha sido identificado correctamente
    if(!response.ok){
      throw new Error(result.message);
    }
    //redirigir según el rol del usuario
    if(result.rolUser === "admin") window.location.assign("/admin");
    
    if(result.rolUser === "cliente") window.location.assign("/cliente");
    
  } catch(error){
    console.error(error);
    alert(error);
  }
};

const registerHandler = async (event) => {
  
  window.location.assign("/register");
};




document.forms["form-login"].addEventListener("submit", loginHandler);
document.getElementsByName("botonRegistro")[0].addEventListener("click", registerHandler);