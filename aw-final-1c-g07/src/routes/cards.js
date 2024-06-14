// import dependencies
const express = require("express");

const cards = require("../controllers/cards");

// cards router
const router = express.Router();


/*
 * GET /
 * Obtiene todas las cartas almacenadas en la base de datos.
 * OK: 200 con la lista de las cartas
 * Error: 404 si no hay cartas
 */
router.get("/", cards.getAll);

/*
 * POST /
 * Añade o actualiza una carta a la base de datos
 * OK: 201 con los datos de la carta
 * Error: 400 si los datos no son correctos
 */
router.post("/", cards.add);

/*
 * DELETE /:id
 * Elimina una carta por su id
 * OK: 204 sin contenido
 * Error: 404 si la carta no existe
 */
router.delete("/:id", cards.remove);


// export the router
module.exports = router;