const mongoose = require("mongoose");

const cartas = new mongoose.Schema({
  idCard: {
    required: true,
    type: Number
  },
  units: {
    required: true,
    type: Number
  }
});

module.exports = mongoose.model("Cartas", cartas);