const Sugerencia = require('../models/Sugerencias');


const add = async (req, res) => {

  try{
    // extract the fields from the request body
    const { email, mensaje } = req.body;

    // ensure all the fields have been provided
    if (!email || !mensaje) 
      throw new Error('All fields are required');

    // create the suggestion and save it
    const sugerencia = new Sugerencia({
      email: email,
      mensaje: mensaje,
    });
    await sugerencia.save();

    console.log("Sugerencia recibida correctamente");

    // return the new suggestion
    res.status(201).json(sugerencia);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {

  try{
    // extract the fields from the request body
    const { email, mensaje } = req.body;

    // ensure all the fields have been provided
    if (!email || !mensaje) 
      throw new Error('All fields are required');

    // find the suggestion and delete it
    const suger = await Sugerencia.findOneAndDelete({email: email, mensaje:mensaje});

    console.log("Sugerencia borrada correctamente.");

    // return the status code
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};


const get = async (req, res) => {

  try{
    // get all the suggestions
    const sugerencias = await Sugerencia.find();

    console.log("Sugerencias obtenidas correctamente.");

    // return the suggestions
    res.status(200).json(sugerencias);
    
  }catch(error){
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  add,
  remove,
  get
}