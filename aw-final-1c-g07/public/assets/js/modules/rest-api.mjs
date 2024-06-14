/**
 * URL base de la API REST.
 */
const baseURL = "/api/";

/**
 * Inicia la sesión dentro de la aplicación web.
 *
 * @param {FormData} data Datos del usuario a enviar.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const loginUser = (data) => {
  // Transformar el FormData en un object normal
  let user = {
    userName:
      data.get("userName"),
    password: 
      data.get("password"),
  }
  // Petición: POST /api/usuario/login
  // Enviar los datos como un JSON
  return fetch(`${baseURL}usuario/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
};


/**
 * Crea un nuevo usuario con los datos especificados.
 */
const createUser = (data) => {
  // Transformar el FormData en un object normal (siguiendo la estructura
  // del modelo de datos del backend) para poder serializarlo después
  // a JSON. Para ello, utilizar el método get() para obtener tipos normales
  // y getAll() para obtener Arrays
  const user = {
    nameUser: data.get("name"),
    lastNameUser: data.get("lastName"),
    rolUser: data.get("rol"),
    userName: data.get("userName"),
    emailAddress: data.get("email"),
    password: data.get("password"),
  }

  // Petición: POST /api/usuario/
  return fetch(`${baseURL}usuario`, {
    method: "POST",
    // Enviar los datos como un JSON
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    // Agregar credenciales
    credentials: "include",
  });
};

/**
 * Elimina un usuario.
 *
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const deleteUser = (data) => {
  const options = {
    method: "DELETE",
    credentials: "include",
  };

  if (data) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  // Petición: DELETE /api/usuario/
  return fetch(`${baseURL}usuario`, options);
};

/**
 * Cierra la sesión del usuario actual.
 *
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const logoutUser = () => {
  // Petición: GET /api/usuario/logout
  return fetch(`${baseURL}usuario/logout`, { credentials: "include", method: "POST" }); // chatGPT versión física dice que POST
};

/**
 * Busca todos aquellos Pokémon cuyo nombre contenga un valor dado.
 *
 * @param {string} query Nombre del Pokémon a buscar.
 * @returns {Promise<Response>} Posible resultado de la operación asíncrona.
 */
const searchClientById = () => {

  return fetch(`${baseURL}usuario`, {
    method: "GET",
    // Agregar credenciales
    credentials: "include"
  });
};

//Fetch defensa

const getAll= () => {

  return fetch(`${baseURL}defensa`, {
    method: "GET",
    // Agregar credenciales
    credentials: "include"
  });
};

const edit = (id, data) => {
  return fetch(`${baseURL}defensa/${id}`,{
    method: "PUT",
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
};

const postDefensa = (data) => {
  return fetch(`${baseURL}defensa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

const deleteDefensa = (id) => {
  return fetch(`${baseURL}defensa/${id}`,{
    method : 'DELETE',
    credentials : "include",
  });
} 




/*
 * Actualiza los datos de un usuario
 */
const updateUser = (query, data) =>{

  return fetch(`${baseURL}usuario/${query}`,{

    method: "PUT",
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
};

/*
 * Obtiene todos los usuarios del sistema.
 */
const getClients = () => {
  return fetch(`${baseURL}usuario/allUsersClient`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
};

/*
 * Obtiene todos los pedidos del sistema.
 */
const showOrders = () => {
  return fetch(`${baseURL}pedido`, {
    method: "GET",
    credentials: "include",
  }); 
};

/*
 * Crea un nuevo pedido.
 */
const createOrder = (data) => {
  return fetch(`${baseURL}pedido`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

/*
 * Crea una nueva sugerencia.
 */
const createSuggestion = (data) => {
  return fetch(`${baseURL}sugerencias`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      // Enviar los datos como un JSON
      body: JSON.stringify(data)
  });    
};

/*
 * Elimina una sugerencia.
 */
const removeSuggestion = (data) => {
  return fetch(`${baseURL}sugerencias`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    // Enviar los datos como un JSON
    body: JSON.stringify(data)
  });
};

/*
 * Obtiene todas las sugerencias.
 */
const getSuggestions = () => {
  return fetch(`${baseURL}sugerencias`, {
    credentials: "include",
  });
};

/*
 * Crea una nueva carta.
 */
const createCard = (data) => {
  return fetch(`${baseURL}cartas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
};

/*
 * Elimina una carta.
 */
const removeCard = (id) => {
  return fetch(`${baseURL}cartas/${id}`, {
    method: 'DELETE',
    credentials: "include",
  });
};

/*
 * Obtiene todas las cartas.
 */
const getCards = () => {
  return fetch(`${baseURL}cartas`, {
    credentials: "include",
  });
};


/*
 * Obtiene la información de una carta.
 */
const searchCardInfo = (nombre) => {
  return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${nombre}`);
};

/*
 * Obtiene la información de una carta.
 */
const getCardInfo = (id) => {
  return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
};


// Exportar características
export {
  loginUser,
  createUser,
  deleteUser,
  logoutUser,
  searchClientById,
  updateUser,
  getClients,
  showOrders,
  createOrder,
  createSuggestion,
  removeSuggestion,
  getSuggestions,
  createCard,
  removeCard,
  getCards,
  searchCardInfo,
  getCardInfo, 
  getAll, 
  edit,
  postDefensa, 
  deleteDefensa
};

// Mostrar por consola que el módulo ha sido cargado con éxito
console.log("Módulo rest-api cargado con éxito.");