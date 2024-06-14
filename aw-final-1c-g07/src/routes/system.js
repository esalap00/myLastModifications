// import dependencies
const express = require("express");

const system = require("../controllers/system");
const mongoose = require("../controllers/mongoose");
const tunnel = require("../controllers/localtunnel");

// internal urls router
const router = express.Router();


/*
 * GET /reload
 * Reinicia el servidor
 * OK: 200 sin contenido
 * Error: 500 si se ha producido un error
 */
router.get("/reload", system.reload); 

/*
 * GET /status
 * Provee el estado del servidor
 * OK: 200 con la información de estado
 * Error: 500 si se ha producido un error
 */
router.get("/status", system.status);

/*
 * GET /mongoose
 * Provee el estado de la conexión a la base de datos
 * OK: 200 con la información de estado
 * Error: 500 si se ha producido un error
 */
router.get("/mongoose", (req, res) => res.json(mongoose.status()));

/*
 * GET /tunnel
 * Provee el estado del tunnel
 * OK: 200 con la información de estado
 * Error: 500 si se ha producido un error
 */
router.get("/tunnel", (req, res) => res.json(tunnel.status()));

/*
 * GET /tunnel/connect
 * Realiza la conexión al tunnel, si no estaba conectado
 * OK: 200 si se ha conectado correctamente
 * Error: 500 si se ha producido un error
 */
router.get("/tunnel/connect", (req, res) => res.sendStatus(tunnel.connect()? 200 : 500));

/*
 * GET /tunnel/disconnect
 * Desconecta del tunnel, si estaba conectado
 * OK: 200 si se ha desconectado correctamente
 * Error: 500 si se ha producido un error
 */
router.get("/tunnel/disconnect", (req, res) => res.sendStatus(tunnel.disconnect()? 200 : 500));


// export the router
module.exports = router;