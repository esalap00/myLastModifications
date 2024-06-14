/*
 * Factoría para registrar las peticiones (con o sin contenidos)
 */
const factory = (contents) => {

  /*
  * Middleware para registrar las peticiones al servidor
  */
  const logRequests = (req, res, next) => {

    // Obtener la fecha actual del servidor
    const current_time = new Date();

    // Mostrar por consola un mensaje que indique:
    // [hora_actual_formato ISO] método_HTTP url_base/path_url
    console.log(`[${current_time.toISOString()}] ${req.method} ${req.baseUrl + req.url}`);

    // Si no se ha especificado que registre los contenidos de la petición, 
    // delegar a la siguiente función
    if (!contents) return next();

    // Mostrar las cabeceras
    console.log(req.headers);
    
    // Si el método es POST o PUT, mostrar también por consola el body
    // del mensaje únicamente si sigue el formato de datos JSON
    const putPost = (req.method === "POST") || (req.method === "PUT");
    const json = (req.headers["content-type"] === "application/json");

    if (putPost && json) console.log(JSON.stringify(req.body));

    // Delegar a la siguiente función
    next();
  };

  // Devuelve la función de registro con la configuración adecuada
  return logRequests;
};


// Exportar la función factoría
module.exports = factory;