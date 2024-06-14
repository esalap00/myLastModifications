const pedidosModel = require('../models/Pedidos');


const add = (req, res) => {
  
  try {
    // extract the fields from the request body
    const {
      idCard,
      units,
      price,
      sellDate,
      buyer
    } = req.body;

    // ensure all the fields have been provided
    if (!idCard || !units || !price || !sellDate || !buyer) 
      throw new Error('All fields are required');
    
    // create the order
    const pedido = pedidosModel.create({
      idCard,
      units,
      price,
      sellDate,
      buyer
    });
    
    // return the new order
    res.status(201).json(pedido);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
  
};

const remove = async (req, res) => {

  try{  
    // extract the fields from the request body
    const {
      idCard,
    } = req.body;
  
    // ensure all the fields have been provided
    if (!idCard) 
      throw new Error('All fields are required');
    
    // remove the order
    const order = await pedidosModel.findOneAndDelete({ idCard });
  
    // return success code
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

const getAll = async (req, res) => {

  try{
    // get all the orders
    const orders = await pedidosModel.find();

    // return the orders
    res.status(200).json(orders);
    
  }catch(error){
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  add, remove, getAll
}

