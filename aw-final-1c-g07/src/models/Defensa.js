const mongoose = require("mongoose");

const defensa = new mongoose.Schema({
  datos: {
    required: true,
    type: String
  }, 
  nombre: {
    required: true,
    type: String
  }, 
  nacimiento:{
    required: true,
    type: Date
  }
});

module.exports = mongoose.model("Defensa", defensa);