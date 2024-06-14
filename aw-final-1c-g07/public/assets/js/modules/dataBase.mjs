import * as html  from './html-components.mjs';
import * as rest_api from "./rest-api.mjs";

let cartas = [];
let deck = [];


const searchCardByName = (query) => {
  // Busca y devuelve las cartas cuyos nombres comiencen con el término de búsqueda
  var nombre = query.toLowerCase();
  const lista = [];

  for(const name in cartas){
      if(cartas[name].name.toLowerCase().startsWith(nombre)){
          lista.push(cartas[name]);
      }
  }
  return lista;
};


const addCardToDeck = (cardName) => {
  // Agrega la carta al mazo
  let card =  deck.find((card)=> card.name === cardName);
  if(card){
      card.amount++;
  }else if(!card){
    let newCard = cartas.find((card)=> card.name === cardName);
    newCard.amount = 1;  
    deck.push(newCard);
  }
};

const removeCardFromDeck = (cardName) => {
  // Busca el índice de la carta en el mazo del usuario basándose en el nombre de la carta.
  let cardIndex = deck.findIndex((card) => card.name === cardName);
  // Verifica si la carta está en el mazo, si está en el mazo reduce la cantidad y 
  // si la cantidad es 0 la elimina del mazo.
  if(cardIndex !== -1){
      let card = deck[cardIndex];
      if(card.amount > 1){
          card.amount--;
      }else{
          deck.splice(cardIndex, 1);
      }
  }
  //Tener en cuenta si devuelve deck
};


const fetchData = async (update) => {

  const cards = await rest_api.getCards().then(r => r.json());

  for (const c of cards) {
    const data = await rest_api.getCardInfo(c.idCard).then(r => r.json());

    if (!cartas.includes(data.data[0]))
      cartas.push(data.data[0]);
  }
  if (update) update(cartas);
  else html.updateCardElements(cartas);
}


const searchInfoByName = async (query) => {

  var nombre = query.toLowerCase();
  const lista = [];

  const { data } = await rest_api.searchCardInfo(query).then(r => r.json());

  for (const c of data) lista.push(c);

  cartas = lista;  
  return lista;
};

export {cartas, searchCardByName,fetchData, addCardToDeck, removeCardFromDeck, deck, searchInfoByName };