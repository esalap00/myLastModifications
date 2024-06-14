const mongoose = require("mongoose");

const pedidos = new mongoose.Schema({
  idCard: {
    required: true,
    type: Number
  },
  units: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  sellDate: {
    required: true,
    type: Date
  },
  buyer: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("Pedidos", pedidos);