const errors = require('./errors');


/*
 * Factoría para filtrar el acceso a ciertas rutas del sitio
 */
const factory = (...paths) => {

  if (!paths) paths = [];

  /*
  * Middleware para filtrar contenido no deseado
  */
  const filter = (req, res, next) => {

    // extract the url being requested
    const currentURL = req.originalUrl;

    // test against the blocked paths
    const isBlocked = paths.some(path => {
      if (path instanceof RegExp) return path.test(currentURL);
      else return currentURL.includes(path);
    });

    // if its blocked, just trigger the 404 handler
    if (isBlocked) {
      
      console.log("Filtered");
      return errors.notFound(req, res);
    }
    
    // if its not filtered, just proceed as normal
    else 
      return next();
  };

  return filter;
};


module.exports = factory;