const Cartas = require('../models/Cartas');


const add = async (req, res) => {
  
  try {
    // extract the fields from the request body
    const {
      idCard,
      units
    } = req.body;
    
    // ensure all the fields have been provided
    if (!idCard || !units) 
      throw new Error('All fields are required');
    
    // check if the card already exist
    const card = await Cartas.findOne({ idCard });

    // update the units if it does
    let newCard;
    if (card) {
      card.units += units;
      newCard = card;
    }

    // if not, create it
    else {
      newCard = await Cartas.create({
        idCard,
        units
      });
    }

    // return the new product
    res.status(201).json(newCard);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  
  try {
    // extract the fields from the parameters
    const idCard = req.params.id;

    // ensure the id has been provided
    if (!idCard) throw new Error('Card ID not supplied');

    // remove the card
    await Cartas.findOneAndDelete({ idCard });

    // return the success code
    res.sendStatus(204);

  } catch(error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

const getAll = async (req, res) => {

  try {
    // get all the cards
    const card = await Cartas.find();

    // and return them
    res.status(200).json(card);

  } catch(error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  add, remove, getAll
}

