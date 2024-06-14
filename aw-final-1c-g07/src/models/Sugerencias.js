const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let sugerencia = new Schema({

  email:{
    type: String,
    required: true,
  },

  mensaje:{
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("Sugerencia", sugerencia);