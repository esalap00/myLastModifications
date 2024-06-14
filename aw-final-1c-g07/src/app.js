// import dependencies
const express = require("express");
const dotenv = require("dotenv");

const errors = require("./middlewares/errors");
const logger = require("./middlewares/logger");
const protector = require("./middlewares/protector");

const system_router = require("./routes/system");
const frontend_router = require("./routes/frontend");
const users_router = require("./routes/users");
const sugerencias_router = require("./routes/suggestion");

const cards_router = require("./routes/cards");
const pedidos_router = require("./routes/pedidos"); 
const defensa_router = require("./routes/defensa");

const localtunnel = require("./controllers/localtunnel")
const mongoose = require("./controllers/mongoose");

const cookieParser = require("cookie-parser");


// some debugging variables
const debug_frontend = false;
const debug_api = false;


// load the environment variables automatically
dotenv.config();

// get the port to use and create the express app
const port = process.env.PORT || 3000;
const app = express();

// Analizar las cookies
app.use(cookieParser());

// add the json parser
app.use(express.json());

// load the rendering engine and the views
app.set("view engine", "ejs");
app.set("views", "./src/views");

// show an error page to the client on server errors
app.use(errors.internal);


// serve the public content, logging any requests
app.use("/", logger(debug_frontend), frontend_router);

// add the logger for the apis
app.use(logger(debug_api));

// serve the system urls
app.use("/system", protector, system_router);

// serve the users api
app.use("/api/usuario", users_router);

// serve the suggestions api
app.use("/api/sugerencias", protector, sugerencias_router);

// serve the orders api
app.use("/api/pedido", protector, pedidos_router);

// serve the cards api
app.use("/api/cartas", protector, cards_router);

// serve defensa api
app.use("/api/defensa", defensa_router);

// handle the 404 error
app.use("*", errors.notFound);

// prepare the testing environment
if (process.env.NODE_ENV === "test") 
  module.exports = app;

// or start the server in production mode
else {
  
  // connect to the database
  mongoose.connect();

  // start the express server
  app.listen(port, () => console.log(`Server is running on port ${port}`));

  // start the HTTPS tunnel
  localtunnel.connect(port);
}
