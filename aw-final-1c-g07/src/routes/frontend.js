// Cargar módulo express
const express = require("express");
const path = require("path");

const filter = require("../middlewares/filter");
const protector = require("../middlewares/protector");

const rutaFrontEnd = path.join(__dirname, '../../public');

// Enrutador para el frontend
const router = express.Router();


// easily create a regex for any html file except the one specified
const html = filename => new RegExp(`/^(?!${filename}[.]html$).*html/gm`);

// easily set up a static path with html files blocked
const filteredStatic = (url, filename) => {
  router.use(url, 
    protector,
    filter(html(filename)), 
    express.static(rutaFrontEnd, {index: `${filename}.html`})
  );
};


// set up the base filter
router.use(filter(
  "/scss/",             // block the scss directory
  ".map",               // block the css map files
));

// set the rest of the routes
router.use("/", express.static(rutaFrontEnd));

router.use("/register", filter(html("register")),  express.static(rutaFrontEnd, {index: "register.html"}));

filteredStatic("/cliente", "cliente");

filteredStatic("/admin", "admin");

filteredStatic("/admin/gestionCartas", "gestionCartas");

filteredStatic("/admin/sugerencias", "mostrarSugerencias");

filteredStatic("/admin/gestionCuentas", "cuentasAdministrador");

filteredStatic("/admin/perfil", "perfil");

filteredStatic("/cliente/sugerencias", "registroSugerencias");

filteredStatic("/cliente/perfil", "perfil");

filteredStatic("/cliente/gestionCompras", "gestionCompras");

filteredStatic("/cliente/verPedidos", "verPedidos");

filteredStatic("/cliente/verDefensa", "defensa");
// Exportar el enrutador
module.exports = router;