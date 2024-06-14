const express = require("express");

const pedidos = require("../controllers/pedidos");

// orders router
const router = express.Router();


/*
 * POST /
 * Añade un nuevo pedido
 * OK: 201 con los datos del pedido
 * Error: 400 si se ha producido un error
 */
router.post("/", pedidos.add);

/*
 * DELETE /
 * Elimina un pedido dado su id
 * OK: 204 sin contenido
 * Error: 404 si se ha producido un error
 */
router.delete("/", pedidos.remove);

/*
 * GET /
 * Devuelve todos los pedidos
 * OK: 200 con los pedidos
 * Error: 404 si se ha producido un error
 */
router.get('/', pedidos.getAll);


// export the router
module.exports = router;
