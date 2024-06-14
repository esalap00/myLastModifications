const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usuario= new Schema({

  nameUser:{
    type: String,
    required: true,
  },
  lastNameUser:{
    type: String,
    required: true,
  },
  rolUser:{
    type: String,
    required: true,
  },
  userName:{
    type: String,
    required: true,
  },
  emailAddress:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
    default: [],
  }
})

const usuarioBase = mongoose.model("Usuario", usuario);

module.exports = usuarioBase;