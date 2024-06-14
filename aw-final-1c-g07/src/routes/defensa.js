const express = require("express");

const defensa= require("../controllers/defensa");

// cards router
const router = express.Router();

//Trae todos los datos de la colección
router.get("/", defensa.getAll);

//Añade un dato
router.post("/",defensa.add);

//edita un dato de la defensa
router.put("/:id", defensa.edit);

//edita un dato de la defensa
router.delete("/:id", defensa.remove);


module.exports = router;