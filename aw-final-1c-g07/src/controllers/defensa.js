const defensaController = require("../models/Defensa");


const getAll = async (req, res) => {

    try {
      // get all the defensa
      const defensa = await defensaController.find();
  
      // and return them
      res.status(200).json(defensa);
  
    } catch(error) {
      console.error(error);
      res.status(404).json({ message: error.message });
    }
};

const add = async (req, res) => {
    try{
        const defensaPost = new defensaController(req.body);
        await defensaPost.save();
        res.status(201).json(defensaPost);
    }catch(error){
        console.error(error);
        res.status(400).json({message: error.message});
    }
};

const edit = async (req, res) => {

    try{
        const editDefensaId = await defensaController.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(editDefensaId);
    }catch(error){
        console.log(error);
        res.status(409).log({error: error.message});
    }
};

const remove = async (req, res) => {

    console.log(req.params.id);

    try{
        await defensaController.findByIdAndDelete(req.params.id);
        res.status(204).json();
    }catch(error){
        console.log(error);
        res.status(404).log({error: error.message});
    }

};

  
module.exports = {
    getAll, 
    add,
    edit, 
    remove
}
  