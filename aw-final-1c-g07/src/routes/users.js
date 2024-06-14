// import dependencies
const express = require("express");

const users = require("../controllers/users");

// user router
const router = express.Router();


/*
 * POST /login
 * Autentica un usuario
 * OK: 200 con el token y el rol del usuario
 * Error: 400 si se ha producido un error
 */
router.post("/login", users.login);

/*
 * POST /logout
 * Cierra la sesión de un usuario
 * OK: 204 sin datos, habiendo eliminado el token
 * Error: 400 si se ha producido un error
 */
router.post("/logout", users.logout);

/*
 * POST /
 * Añade un nuevo usuario
 * OK: 201 con los datos del usuario
 * Error: 400 si se ha producido un error
 */
router.post("/", users.register);

/*
 * DELETE /
 * Elimina un usuario
 * OK: 204 sin datos
 * Error: 404 si se ha producido un error
 */
router.delete("/", users.remove);

/*
 * GET /
 * Obtiene los datos de un usuario
 * OK: 200 con los datos del usuario
 * Error: 404 si se ha producido un error
 */
router.get('/', users.getUser);

/*
 * PUT /
 * Actualiza los datos de un usuario
 * OK: 200 con los datos actualizados
 * Error: 409 si se ha producido un error
 */
router.put('/:id', users.updateUser);

/*
 * GET /allUsersClient
 * Obtiene todos los usuarios que son clientes
 * OK: 200 con los datos de todos los usuarios
 * Error: 404 si se ha producido un error
 */
router.get('/allUsersClient', users.getAllUsersClient);


// export the router
module.exports = router;