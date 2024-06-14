import * as rest_api from "./modules/rest-api.mjs";
import * as db  from './modules/dataBase.mjs';

const updateCardElements = (data) => {
  // Obtener los resultados de las cartas.
  let resultados = document.getElementsByClassName("card-grid")[0];
  // Limpiar el contenido existente en el apartado de los resultados.
  resultados.textContent = '';

  // Por cada carta de la lista de cartas:
  data.forEach(carta => {
      // Verificar si la carta tiene URL de la imagen.
      if(carta.card_images[0].image_url){
          let card = document.createElement('button');
          card.className = 'card';
          card.name = carta.name;

          let imgCarta = document.createElement('img');
          imgCarta.src = carta.card_images[0].image_url;
          card.append(imgCarta);

          // Añadir a los resultados un elemento <article> que contenga el elemento <button>
          let articulo = document.createElement('article');
          articulo.append(card);
          resultados.append(articulo);

          // Añadir un evento click a cada carta.
          card.onclick = () => {
              // Añadir la carta al mazo.
              db.addCardToDeck(carta.name);
              // Actualizar la cantidad de cartas en el mazo.
              updateDeckElements();
          }
      }
  });
};

const updateDeckElements = () => {
  // Obtener el mazo de cartas.
  let mazo = document.getElementById("deck-list");
  // Limpiar el contenido existente en el mazo.
  mazo.textContent = '';

  // Por cada carta en el mazo:
  db.deck.forEach(carta => {
      // Crear un elemento <button> con la cantidad de cartas.
      let card = document.createElement('button');
      card.className = 'card';
      card.name = carta.name;
      card.textContent = carta.amount;

      // Añadir a la lista de cartas un elemento <article> que contenga el elemento <button>
      let articulo = document.createElement('article');
      articulo.append(card);
      mazo.append(articulo);

      // Añadir un evento click a cada carta.
      card.onclick = () => {
          // Eliminar la carta del mazo.
          db.removeCardFromDeck(carta.name);
          // Actualizar la cantidad de cartas en el mazo.
          updateDeckElements();
      }

      //crear un boton para eliminar la carta del deck
      let botonEliminar = document.createElement('button');
      botonEliminar.textContent = "Eliminar";
      botonEliminar.onclick = () => {
          db.removeCardFromDeck(carta.name);
          updateDeckElements();
      }
      articulo.append(botonEliminar);
      
      //crear un texto solo de lectura con el precio de la carta
      //que saque la cantidad de la carta y la multiplique por el precio
      let precio = document.createElement('p');
      let precioCarta = carta.card_prices[0].cardmarket_price;
      let cantidad = carta.amount;
      precio.textContent = `Precio: ${precioCarta * cantidad}€`;
      articulo.append(precio);

  });
};

const verPerfilHandler = async (event) => {
  // Evitar la propagación de eventos para que no se envíe el formulario
  event.preventDefault();
    //Tocaría pasar a la pagina de ver perfil
    window.location.assign("./perfil");
  
};

const verSugerenciasHandler = async (event) => {
    //Tocaría pasar a la pagina de ver perfil
    window.location.assign("./sugerencias");
  
};

const gestionCuentasHandler = async (event) => {
    //Tocaría pasar a la pagina de ver perfil
    window.location.assign("./gestionCuentas");
  
};

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

/////////////////////////////////////////////////
const searchCardHandler = (event) => {
  
  event.preventDefault();

  // Obtener los datos del formulario.
  let dato = event.target;
  let busquedaCarton = dato.elements['name'].value;

  // Realizar la búsqueda en la base de datos
  const results = db.searchCardByName(busquedaCarton);

  // Actualizar el apartado de los resultados
  updateCardElements(results);

};

const deleteCards = async () => {
  const cards = document.getElementById("deck-list").querySelectorAll("article");

  for (const card of cards) {

    let button = card.firstChild;

    let info = await rest_api.searchCardInfo(button.name)
      .then(r => r.json())
      .then(j => j.data[0]);

    let quantity = parseInt(button.innerText);

    const response = await rest_api.removeCard(info.id);

    while (db.deck.some(c => c.name === info.name) && response.ok)
      db.removeCardFromDeck(info.name);
    
  }

  updateDeckElements(db.deck);

  // Weird hack to clear the list
  db.cartas.length = 0;
  db.fetchData(updateCardElements);
};

db.fetchData(updateCardElements);


document.forms['yugioh-search'].addEventListener('submit', searchCardHandler);

document.getElementById("carro").style.display = "block";
document.getElementById("perfilUser").addEventListener("click",verPerfilHandler);
document.getElementById("cerrarSesion").addEventListener("click", logoutHandler);
document.getElementById("sugerencias").addEventListener("click", verSugerenciasHandler);
document.getElementById("gestion").addEventListener("click", gestionCuentasHandler);
document.getElementById("addCard").addEventListener("click", () => window.location.assign("./gestionCartas"));
document.getElementById("deleteCards").addEventListener("click", deleteCards);

