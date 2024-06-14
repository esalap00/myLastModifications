/*
 * Middleware para manejo de errores 401
 */
const unauthorized = (req, res, next) => {


  console.log("Unauthorized");

  // just render an error page, along with the 403 status code
  res.status(403).render("error", {
    title: "No autorizado",
    message: "No tiene permisos para acceder a esta pagina"
  });
};


/*
 * Middleware para manejo de errores 404
 */
const notFound = (req, res, next) => {

  console.log("Not Found");

  // just render an error page, along with the 404 status code
  res.status(404).render("error", {
    title: "No encontrado",
    message: `La pagina ${req.originalUrl} no se ha encontrado`
  });
};

/*
 * Middleware para manejo de errores internos
 */
const internal = (err, req, res, next) => {

  // log the error to the console
  console.log(`Request ${req.originalUrl} failed:`);
  console.error(err.stack);

  // and render the error page, along with the 500 status code
  res.status(500).render("error", {
    title: "Error del servidor",
    message: "Ha ocurrido un error inesperado"
  });
};


module.exports = {
  unauthorized,
  notFound,
  internal
};