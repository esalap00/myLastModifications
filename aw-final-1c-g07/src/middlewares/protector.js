const errors = require('./errors');
const users = require('../controllers/users');

/*
 * Middleware protector de urls
 */
const protectURL = async (req, res, next) => {

  try {
    // verify the token
    const data = await users.verify(req.cookies.jwt_token);

    // fail if its not valid
    if (!data) throw new Error('Invalid token');

    // call the next middleware
    next();

  } catch(error) {

    // print the error and render the associated page
    console.error(error);
    errors.unauthorized(req, res);
  }
};


// Exportar únicamente el handler para proteger el acceso a URLs
module.exports = protectURL;