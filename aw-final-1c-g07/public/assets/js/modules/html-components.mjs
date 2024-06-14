import * as  db  from "./dataBase.mjs";
import * as rest_api from "./rest-api.mjs";


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

      //crear un botón para añadir al pedido
      let botonPedido = document.createElement('button');
      botonPedido.textContent = "Añadir pedido";
      botonPedido.onclick = () => {
        // obtener la carta
        let c = db.searchCardByName(carta.name);
        console.log(c);

        rest_api.searchClientById()
        .then(r => r.json())
        .then(buyer => {
          

          // realizar la peticion al backend
          rest_api.createOrder({
            idCard: c[0].id,
            units: cantidad,
            price: precioCarta * cantidad,
            sellDate: new Date(),
            buyer: buyer._id
          });
        });

      }
      articulo.append(botonPedido);

  });
};

//crear función que muestre la vista de pedidos de html
const showOrders = (data) => {
  // Obtener el contenedor de los pedidos.
  let contenedor = document.getElementById("orders");
  // Limpiar el contenido existente en el contenedor.
  contenedor.textContent = '';
  // Por cada pedido en la lista de pedidos:
  data.forEach(async (pedido) => {
      // Crear un elemento <article> con el pedido.
      let articulo = document.createElement('article');

      let info = await rest_api.getCardInfo(pedido.idCard)
      .then((response) =>{
           return response.json();
      });

      articulo.textContent = `Pedido: ${info.data[0].name} - Cantidad: ${pedido.units} - Fecha: ${pedido.sellDate}`;
      // Añadir el pedido al contenedor.
      contenedor.append(articulo);
  });
};

//crear función que muestre la vista de pedidos de html
const mostrarDatosDefensa = (data, callback) => {
  // Obtener el contenedor de los pedidos.
  let contenedor = document.getElementById("defensa");
  // Limpiar el contenido existente en el contenedor.
  contenedor.textContent = '';
  // Por cada pedido en la lista de pedidos:
  data.forEach(defensa => {
      // Crear un elemento <article> con el pedido.
      let articulo = document.createElement('article');
      let inputDato = document.createElement('input');
      let inputNombre = document.createElement('input');
      let inputNac = document.createElement('input');
      let buttonEditar = document.createElement('button');
      let buttonEliminar = document.createElement('button');

      inputDato.value = defensa.datos;
      inputNombre.value = defensa.nombre;
      inputNac.value = defensa.nacimiento;
      buttonEditar.textContent = 'Editar';
      buttonEditar.onclick = () => {
        let datos = inputDato.value;
        let nombre = inputNombre.value;
        let nacimiento = inputNac.value;
        rest_api.edit(defensa._id, {datos, nombre, nacimiento}).then(r=>r.json()).then(updatedDefensa => {console.log(updatedDefensa)})
      }

      buttonEliminar.textContent='Eliminar';
      buttonEliminar.onclick = () => {
        rest_api.deleteDefensa(defensa._id)
        console.log(callback);
        callback();
      }

      articulo.append(inputDato);
      articulo.append(inputNombre);
      articulo.append(inputNac);
      articulo.append(buttonEditar);
      articulo.append(buttonEliminar);

     
      
      // Añadir el pedido al contenedor.
      contenedor.append(articulo);
  });
};

export{updateCardElements, updateDeckElements, showOrders, mostrarDatosDefensa};