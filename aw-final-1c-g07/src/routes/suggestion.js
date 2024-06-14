const express = require("express");
const suggestion = require("../controllers/sugerencia");

// suggestions router
const router = express.Router();


/*
 * POST /
 * Añade una nueva sugerencia
 * OK: 201 con los datos de la sugerencia
 * Error: 400 si se ha producido un error
 */
router.post("/", suggestion.add);

/*
 * DELETE /
 * Elimina una sugerencia dados los datos de esta
 * OK: 204 sin contenido
 * Error: 404 si se ha producido un error
 */
router.delete("/", suggestion.remove);

/*
 * GET /
 * Devuelve todos las sugerencias
 * OK: 200 con las sugerencias
 * Error: 404 si se ha producido un error
 */
router.get("/", suggestion.get);


module.exports = router;